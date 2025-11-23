import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { FraudDetector } from "@/lib/fraud-detection";
import { createIPRateLimit } from "@/lib/rate-limit";

interface VoteSubmission {
  categoryId: string;
  nomineeId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, votes, fingerprint } = body as {
      userId: string;
      votes: VoteSubmission[];
      fingerprint: string;
    };

    if (!userId || !votes || votes.length === 0) {
      return NextResponse.json(
        { error: "Neplatné údaje" },
        { status: 400 }
      );
    }

    // Get IP address
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "";

    // Rate limiting
    const ipLimit = createIPRateLimit(ip);
    const rateLimitCheck = await ipLimit.check();
    
    if (!rateLimitCheck.success) {
      return NextResponse.json(
        { error: "Príliš veľa pokusov. Skúste to znova neskôr." },
        { status: 429 }
      );
    }

    const supabase = createAdminClient();

    // Verify user exists and is verified
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Používateľ nenájdený" },
        { status: 404 }
      );
    }

    if (!user.verified_email || !user.verified_phone) {
      return NextResponse.json(
        { error: "Používateľ nie je overený" },
        { status: 403 }
      );
    }

    // Fraud detection
    const fraudDetector = new FraudDetector();
    const fraudWarnings: string[] = [];

    // Check for each vote
    for (const vote of votes) {
      const fraudChecks = await fraudDetector.performFullCheck({
        userId,
        email: user.email,
        ipAddress: ip,
        fingerprint,
        nomineeId: vote.nomineeId,
      });

      // Log any suspicious activity
      for (const check of fraudChecks) {
        await fraudDetector.logFraudDetection(
          check,
          userId,
          null, // voteId will be added after insertion
          ip,
          fingerprint
        );

        if (check.severity === "high") {
          fraudWarnings.push(
            `Podozrivá aktivita detekovaná: ${check.fraudType}`
          );
        }
      }
    }

    // Insert votes (using upsert to handle duplicate votes in same category)
    const votesToInsert = votes.map((vote) => ({
      user_id: userId,
      nominee_id: vote.nomineeId,
      category_id: vote.categoryId,
      ip_address: ip,
      fingerprint,
      user_agent: userAgent,
    }));

    const { data: insertedVotes, error: votesError } = await supabase
      .from("votes")
      .upsert(votesToInsert, {
        onConflict: "user_id,category_id",
        ignoreDuplicates: false,
      })
      .select();

    if (votesError) {
      console.error("Error inserting votes:", votesError);
      return NextResponse.json(
        { error: "Chyba pri ukladaní hlasov" },
        { status: 500 }
      );
    }

    // Log successful vote
    await supabase.from("vote_logs").insert({
      user_id: userId,
      action: "votes_submitted",
      ip_address: ip,
      user_agent: userAgent,
      metadata: {
        vote_count: votes.length,
        categories: votes.map((v) => v.categoryId),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Hlasy boli úspešne odoslané",
      votes: insertedVotes,
      warnings: fraudWarnings,
    });
  } catch (error) {
    console.error("Vote submission error:", error);
    return NextResponse.json(
      { error: "Interná chyba servera" },
      { status: 500 }
    );
  }
}


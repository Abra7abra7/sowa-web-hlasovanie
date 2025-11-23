import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, emailCode, smsCode } = body;

    if (!userId || !emailCode || !smsCode) {
      return NextResponse.json(
        { error: "Všetky polia sú povinné" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const now = new Date().toISOString();

    // Verify email code
    const { data: emailVerification } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("user_id", userId)
      .eq("code", emailCode)
      .eq("type", "email")
      .eq("verified", false)
      .gt("expires_at", now)
      .single();

    if (!emailVerification) {
      return NextResponse.json(
        { error: "Neplatný alebo expirovaný email kód" },
        { status: 400 }
      );
    }

    // Verify SMS code
    const { data: smsVerification } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("user_id", userId)
      .eq("code", smsCode)
      .eq("type", "sms")
      .eq("verified", false)
      .gt("expires_at", now)
      .single();

    if (!smsVerification) {
      return NextResponse.json(
        { error: "Neplatný alebo expirovaný SMS kód" },
        { status: 400 }
      );
    }

    // Mark codes as verified
    await supabase
      .from("verification_codes")
      .update({ verified: true })
      .in("id", [emailVerification.id, smsVerification.id]);

    // Update user verification status
    const { error: updateError } = await supabase
      .from("users")
      .update({
        verified_email: true,
        verified_phone: true,
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating user:", updateError);
      return NextResponse.json(
        { error: "Chyba pri aktualizácii používateľa" },
        { status: 500 }
      );
    }

    // Log action
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    await supabase.from("vote_logs").insert({
      user_id: userId,
      action: "verification_completed",
      ip_address: ip,
      user_agent: request.headers.get("user-agent"),
    });

    return NextResponse.json({
      success: true,
      message: "Overenie bolo úspešné",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Interná chyba servera" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateVerificationCode } from "@/lib/utils";
import { sendEmail, generateVerificationEmailHTML } from "@/lib/email";
import { sendSMS, generateVerificationSMSMessage } from "@/lib/sms";
import { createEmailRateLimit, createSMSRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type } = body; // type: 'email' or 'sms'

    if (!userId || !type) {
      return NextResponse.json(
        { error: "UserId a type sú povinné" },
        { status: 400 }
      );
    }

    if (type !== "email" && type !== "sms") {
      return NextResponse.json(
        { error: "Neplatný typ" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Get user info
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("email, phone")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Používateľ nenájdený" },
        { status: 404 }
      );
    }

    // Check rate limit
    if (type === "email") {
      const emailLimit = createEmailRateLimit(user.email);
      const check = await emailLimit.check();
      if (!check.success) {
        return NextResponse.json(
          { error: "Príliš veľa pokusov. Skúste to znova neskôr." },
          { status: 429 }
        );
      }
    } else {
      const smsLimit = createSMSRateLimit(user.phone);
      const check = await smsLimit.check();
      if (!check.success) {
        return NextResponse.json(
          { error: "Príliš veľa pokusov. Skúste to znova neskôr." },
          { status: 429 }
        );
      }
    }

    // Generate new code
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // Invalidate old codes
    await supabase
      .from("verification_codes")
      .update({ verified: true }) // Mark as verified to invalidate
      .eq("user_id", userId)
      .eq("type", type)
      .eq("verified", false);

    // Store new code
    const { error: codeError } = await supabase
      .from("verification_codes")
      .insert({
        user_id: userId,
        code,
        type,
        expires_at: expiresAt,
      });

    if (codeError) {
      console.error("Error storing verification code:", codeError);
      return NextResponse.json(
        { error: "Chyba pri generovaní kódu" },
        { status: 500 }
      );
    }

    // Send code
    if (type === "email") {
      await sendEmail({
        to: user.email,
        subject: "SOWA Awards - Nový overovací kód",
        html: generateVerificationEmailHTML(code),
      });
    } else {
      await sendSMS({
        to: user.phone,
        message: generateVerificationSMSMessage(code),
      });
    }

    return NextResponse.json({
      success: true,
      message: `Nový ${type === "email" ? "email" : "SMS"} kód bol odoslaný`,
    });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Interná chyba servera" },
      { status: 500 }
    );
  }
}


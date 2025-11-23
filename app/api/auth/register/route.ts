import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateVerificationCode } from "@/lib/utils";
import { sendEmail, generateVerificationEmailHTML } from "@/lib/email";
import { sendSMS, generateVerificationSMSMessage } from "@/lib/sms";
import { createRegistrationRateLimit, createEmailRateLimit, createSMSRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, fingerprint } = body;

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email a telefónne číslo sú povinné" },
        { status: 400 }
      );
    }

    // Get IP address
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Rate limiting
    const registrationLimit = createRegistrationRateLimit(ip);
    const registrationCheck = await registrationLimit.check();
    
    if (!registrationCheck.success) {
      return NextResponse.json(
        { error: "Príliš veľa pokusov o registráciu. Skúste to znova neskôr." },
        { status: 429 }
      );
    }

    const supabase = createAdminClient();

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id, verified_email, verified_phone")
      .eq("email", email)
      .eq("phone", phone)
      .single();

    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
      
      // If already fully verified, return success
      if (existingUser.verified_email && existingUser.verified_phone) {
        return NextResponse.json({
          success: true,
          userId,
          alreadyVerified: true,
        });
      }
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          email,
          phone,
          fingerprint,
          verified_email: false,
          verified_phone: false,
        })
        .select("id")
        .single();

      if (createError || !newUser) {
        console.error("Error creating user:", createError);
        return NextResponse.json(
          { error: "Chyba pri vytváraní používateľa" },
          { status: 500 }
        );
      }

      userId = newUser.id;
    }

    // Generate verification codes
    const emailCode = generateVerificationCode();
    const smsCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

    // Store verification codes
    const { error: codesError } = await supabase
      .from("verification_codes")
      .insert([
        {
          user_id: userId,
          code: emailCode,
          type: "email",
          expires_at: expiresAt,
        },
        {
          user_id: userId,
          code: smsCode,
          type: "sms",
          expires_at: expiresAt,
        },
      ]);

    if (codesError) {
      console.error("Error storing verification codes:", codesError);
      return NextResponse.json(
        { error: "Chyba pri generovaní overovacích kódov" },
        { status: 500 }
      );
    }

    // Send email verification
    const emailLimit = createEmailRateLimit(email);
    const emailCheck = await emailLimit.check();
    
    if (emailCheck.success) {
      await sendEmail({
        to: email,
        subject: "SOWA Awards - Overovací kód",
        html: generateVerificationEmailHTML(emailCode),
      });
    }

    // Send SMS verification
    const smsLimit = createSMSRateLimit(phone);
    const smsCheck = await smsLimit.check();
    
    if (smsCheck.success) {
      await sendSMS({
        to: phone,
        message: generateVerificationSMSMessage(smsCode),
      });
    }

    // Log action
    await supabase.from("vote_logs").insert({
      user_id: userId,
      action: "registration_started",
      ip_address: ip,
      user_agent: request.headers.get("user-agent"),
      metadata: { email, phone: phone.slice(-4) }, // Only log last 4 digits for privacy
    });

    return NextResponse.json({
      success: true,
      userId,
      message: "Overovacieč kódy boli odoslané",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Interná chyba servera" },
      { status: 500 }
    );
  }
}


import twilio from "twilio";

const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

export interface SendSMSParams {
  to: string;
  message: string;
}

export async function sendSMS(params: SendSMSParams): Promise<boolean> {
  if (!twilioClient) {
    console.warn("Twilio not configured, SMS not sent");
    console.log("SMS that would be sent:", params);
    return true; // Return true in development mode
  }

  try {
    // Ensure phone number is in E.164 format
    let phoneNumber = params.to;
    if (!phoneNumber.startsWith("+")) {
      // If it starts with 0, replace with +421 (Slovakia)
      if (phoneNumber.startsWith("0")) {
        phoneNumber = "+421" + phoneNumber.slice(1);
      } else if (!phoneNumber.startsWith("421")) {
        phoneNumber = "+421" + phoneNumber;
      } else {
        phoneNumber = "+" + phoneNumber;
      }
    }

    await twilioClient.messages.create({
      body: params.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return true;
  } catch (error) {
    console.error("Error sending SMS:", error);
    return false;
  }
}

export function generateVerificationSMSMessage(code: string): string {
  return `SOWA Awards - Váš overovací kód je: ${code}. Platnosť: 5 minút.`;
}


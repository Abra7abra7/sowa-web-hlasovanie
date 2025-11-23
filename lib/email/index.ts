import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, email not sent");
    console.log("Email that would be sent:", params);
    return true; // Return true in development mode
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@anketasowa.sk",
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export function generateVerificationEmailHTML(code: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Overovací kód</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">SOWA Awards</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; color: #333333; font-size: 24px;">Overovací kód</h2>
                    <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.5;">
                      Váš overovací kód pre dokončenie hlasovania je:
                    </p>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
                      <span style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px;">${code}</span>
                    </div>
                    <p style="margin: 30px 0 0; color: #666666; font-size: 14px; line-height: 1.5;">
                      Tento kód je platný 5 minút. Ak ste tento kód nepožadovali, ignorujte tento email.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 40px 40px; color: #999999; font-size: 12px; text-align: center; border-top: 1px solid #eeeeee;">
                    &copy; 2025 SOWA Awards. Všetky práva vyhradené.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}


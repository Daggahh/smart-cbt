import fetch from "node-fetch";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const RESEND_API_URL = "https://api.resend.com/emails";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in environment variables");
  }
  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }
  return res.json();
}

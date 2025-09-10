import nodemailer from "nodemailer";
import { Resend } from "resend";

export type MailPayload = {
  to: string;
  subject: string;
  html: string;
};

export function getTransport() {
  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  if (!host || !user || !pass) throw new Error("SMTP not configured");
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendMail(payload: MailPayload) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;

  if (resendApiKey && resendFrom) {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({ from: resendFrom, to: payload.to, subject: payload.subject, html: payload.html });
    return;
  }

  // Fallback to SMTP if Resend not configured
  const transport = getTransport();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@example.com";
  await transport.sendMail({ from, ...payload });
}



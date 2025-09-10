import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  // Only allow registered users to receive magic links
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await prisma.magicLinkToken.create({ data: { email, token, expiresAt } });

  const base = new URL(request.url);
  base.pathname = `/api/auth/callback`;
  base.search = `token=${token}`;
  const link = base.toString();

  try {
    await sendMail({
      to: email,
      subject: "Your login link",
      html: `<p>Click to sign in: <a href="${link}">Sign in</a>. Link expires in 15 minutes.</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Fallback: if email isn't configured, return the login URL for manual click
    const fallback = !process.env.RESEND_API_KEY && !process.env.SMTP_HOST;
    if (fallback) {
      return NextResponse.json({ ok: true, loginUrl: link, fallback: true });
    }
    console.error("Magic link send failed:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}



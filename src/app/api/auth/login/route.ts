import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await prisma.magicLinkToken.create({ data: { email, token, expiresAt } });

  const base = new URL(request.url);
  base.pathname = `/api/auth/callback`;
  base.search = `token=${token}`;
  const link = base.toString();

  await sendMail({
    to: email,
    subject: "Your login link",
    html: `<p>Click to sign in: <a href="${link}">Sign in</a>. Link expires in 15 minutes.</p>`,
  });
  return NextResponse.json({ ok: true });
}



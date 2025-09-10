import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ ok: true });
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await prisma.passwordResetToken.create({ data: { email, token, expiresAt } });
  const base = new URL(request.url);
  base.pathname = `/auth/reset`;
  base.search = `token=${token}`;
  await sendMail({ to: email, subject: "Reset your password", html: `<p>Reset link: <a href="${base.toString()}">Reset password</a></p>` });
  return NextResponse.json({ ok: true });
}



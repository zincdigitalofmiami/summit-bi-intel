import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as { token?: string; password?: string };
  const token = body.token || "";
  const password = body.password || "";
  if (!token || password.length < 8) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  const rec = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!rec || rec.used || rec.expiresAt < new Date()) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  const hash = await bcrypt.hash(password, 12);
  await prisma.user.update({ where: { email: rec.email }, data: { passwordHash: hash } });
  await prisma.passwordResetToken.update({ where: { token }, data: { used: true } });
  return NextResponse.json({ ok: true });
}



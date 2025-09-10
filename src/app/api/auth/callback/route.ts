import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  const record = await prisma.magicLinkToken.findUnique({ where: { token } });
  if (!record || record.used || record.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  // mark used
  await prisma.magicLinkToken.update({ where: { token }, data: { used: true } });

  // ensure user exists
  const user = await prisma.user.upsert({ where: { email: record.email }, create: { email: record.email }, update: { lastLoginAt: new Date() } });

  const secret = process.env.JWT_SECRET || "dev_secret_change_me";
  const auth = jwt.sign({ sub: record.email, role: user.role }, secret, { expiresIn: "30d" });

  const nextPath = user.onboarded ? "/dashboard" : "/auth/welcome";
  const res = NextResponse.redirect(new URL(nextPath, request.url));
  res.cookies.set("auth", auth, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}



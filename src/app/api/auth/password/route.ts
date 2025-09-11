import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = (body.email || "").toLowerCase().trim();
  const password = body.password || "";
  if (!email || !password) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const secret = process.env.JWT_SECRET || "dev_secret_change_me";
  const token = jwt.sign({ sub: user.email, role: user.role }, secret, { expiresIn: "30d" });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth", token, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}



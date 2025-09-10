import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/auth=([^;]+)/);
  if (!match) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const secret = process.env.JWT_SECRET || "dev_secret_change_me";
    const payload = jwt.verify(match[1], secret) as { sub: string };
    await prisma.user.update({ where: { email: payload.sub }, data: { onboarded: true } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
}



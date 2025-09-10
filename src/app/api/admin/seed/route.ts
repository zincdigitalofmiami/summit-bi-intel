import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const tokenHeader = request.headers.get("x-seed-token") || "";
  const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
  if (!tokenEnv || tokenHeader !== tokenEnv) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const existingAdmin = await prisma.user.findFirst({ where: { role: Role.ADMIN } });
  if (existingAdmin) return NextResponse.json({ error: "seed_disabled" }, { status: 403 });
  await prisma.user.upsert({
    where: { email: "jose@summitmarinedevelopment.com" },
    create: { email: "jose@summitmarinedevelopment.com", name: "Jose Morales", role: Role.ADMIN },
    update: { role: Role.ADMIN },
  });
  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tokenQuery = url.searchParams.get("token") || "";
  const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
  if (!tokenEnv || tokenQuery !== tokenEnv) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const existingAdmin = await prisma.user.findFirst({ where: { role: Role.ADMIN } });
  if (existingAdmin) return NextResponse.json({ error: "seed_disabled" }, { status: 403 });
  await prisma.user.upsert({
    where: { email: "jose@summitmarinedevelopment.com" },
    create: { email: "jose@summitmarinedevelopment.com", name: "Jose Morales", role: Role.ADMIN },
    update: { role: Role.ADMIN },
  });
  return NextResponse.json({ ok: true });
}



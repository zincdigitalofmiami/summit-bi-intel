import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const tokenHeader = request.headers.get("x-seed-token") || "";
  const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
  if (!tokenEnv || tokenHeader !== tokenEnv) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  await prisma.user.upsert({
    where: { email: "jose@summitmarinedevelopment.com" },
    create: { email: "jose@summitmarinedevelopment.com", name: "Jose Morales", role: Role.ADMIN },
    update: { role: Role.ADMIN },
  });
  return NextResponse.json({ ok: true });
}



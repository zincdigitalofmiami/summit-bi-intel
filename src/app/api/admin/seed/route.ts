import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const tokenHeader = request.headers.get("x-seed-token") || "";
    const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
    if (!tokenEnv || tokenHeader !== tokenEnv) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const existingAdmin = await prisma.user.findFirst({ where: { role: Role.ADMIN } });
    if (existingAdmin) {
      return NextResponse.json({ error: "seed_disabled" }, { status: 403 });
    }

    await prisma.user.upsert({
      where: { email: "jose@summitmarinedevelopment.com" },
      create: { email: "jose@summitmarinedevelopment.com", name: "Jose Morales", role: Role.ADMIN, onboarded: true },
      update: { role: Role.ADMIN },
    });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Admin seed POST failed:", err);
    return NextResponse.json({ error: "seed_failed", detail: String(err?.message || err) }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const tokenQuery = url.searchParams.get("token") || "";
    const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
    const isPreview = process.env.VERCEL_ENV === "preview";
    if (tokenEnv) {
      if (tokenQuery !== tokenEnv) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
    } else {
      // Fallback: allow seeding on preview only when no ADMIN exists (one-time setup)
      if (!isPreview) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const existingAdmin = await prisma.user.findFirst({ where: { role: Role.ADMIN } });
    if (existingAdmin) {
      return NextResponse.json({ error: "seed_disabled" }, { status: 403 });
    }

    await prisma.user.upsert({
      where: { email: "jose@summitmarinedevelopment.com" },
      create: { email: "jose@summitmarinedevelopment.com", name: "Jose Morales", role: Role.ADMIN, onboarded: true },
      update: { role: Role.ADMIN },
    });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Admin seed GET failed:", err);
    return NextResponse.json({ error: "seed_failed", detail: String(err?.message || err) }, { status: 500 });
  }
}



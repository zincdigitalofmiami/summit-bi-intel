import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function isValidRole(value: string | null): value is keyof typeof Role {
  return value === "ADMIN" || value === "USER";
}

async function upsertUser(email: string, name: string | null, role: Role) {
  return prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: name || undefined,
      role,
      onboarded: true,
    },
    update: {
      name: name || undefined,
      role,
    },
  });
}

function verifyToken(tokenProvided: string | null) {
  const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (tokenEnv) {
    return tokenProvided && tokenProvided === tokenEnv;
  }
  // If no env token configured, allow only with an explicit token provided.
  // This mirrors preview fallback used for initial seeding while keeping a token requirement.
  if (isPreview) return Boolean(tokenProvided);
  return Boolean(tokenProvided);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    if (!verifyToken(token)) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const roleParam = searchParams.get("role");

    if (!email) {
      return NextResponse.json({ error: "invalid_request", message: "email is required" }, { status: 400 });
    }
    const role: Role = isValidRole(roleParam) ? Role[roleParam] : Role.ADMIN;

    const user = await upsertUser(email, name, role);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err: any) {
    console.error("Admin add-user GET failed:", err);
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const tokenHeader = request.headers.get("x-seed-token");
    if (!verifyToken(tokenHeader)) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const email: string | undefined = body.email;
    const name: string | undefined = body.name;
    const roleParam: string | undefined = body.role;

    if (!email) {
      return NextResponse.json({ error: "invalid_request", message: "email is required" }, { status: 400 });
    }
    const role: Role = isValidRole(roleParam ?? null) ? Role[roleParam as keyof typeof Role] : Role.ADMIN;

    const user = await upsertUser(email, name ?? null, role);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err: any) {
    console.error("Admin add-user POST failed:", err);
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}



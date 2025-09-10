import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenProvided = searchParams.get("token") || "";
    const email = searchParams.get("email");
    if (!email) return NextResponse.json({ error: "invalid_request", message: "email is required" }, { status: 400 });

    const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
    const isPreview = process.env.VERCEL_ENV === "preview";
    if (tokenEnv) {
      if (tokenProvided !== tokenEnv) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    } else if (!isPreview && !tokenProvided) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "user_not_found" }, { status: 404 });

    const token = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.passwordResetToken.create({ data: { email, token, expiresAt } });

    const base = new URL(request.url);
    base.pathname = "/auth/reset";
    base.search = `token=${token}`;
    return NextResponse.json({ ok: true, resetUrl: base.toString(), expiresAt: expiresAt.toISOString() });
  } catch (err: any) {
    console.error("Admin reset-link GET failed:", err);
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}



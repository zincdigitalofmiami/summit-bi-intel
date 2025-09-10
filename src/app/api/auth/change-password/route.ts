import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = (await request.json()) as { currentPassword?: string; newPassword?: string };
    if (!newPassword) return NextResponse.json({ error: "newPassword required" }, { status: 400 });

    // Decode JWT from auth cookie to get user context
    const auth = (await cookies()).get("auth")?.value;
    if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    let email: string | null = null;
    try {
      const decoded = jwt.verify(auth, process.env.JWT_SECRET || "dev_secret_change_me") as any;
      email = decoded?.sub || null;
    } catch {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    if (!email) return NextResponse.json({ error: "missing user context" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "not_found" }, { status: 404 });

    if (user.passwordHash && currentPassword) {
      const ok = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!ok) return NextResponse.json({ error: "invalid_current_password" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("change-password failed:", err);
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}



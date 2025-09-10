import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = (await request.json()) as { currentPassword?: string; newPassword?: string };
    if (!newPassword) return NextResponse.json({ error: "newPassword required" }, { status: 400 });

    const authCookie = (request.headers.get("cookie") || "").split("; ").find((c) => c.startsWith("auth="));
    if (!authCookie) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    // In this simplified implementation we only check cookie presence; in a full JWT, decode user id/email.
    // Fallback: require email in header for now (keeps scope minimal while auth system matures).
    const email = request.headers.get("x-user-email");
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



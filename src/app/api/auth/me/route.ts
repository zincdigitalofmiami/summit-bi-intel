import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || "dev_secret_change_me";
    const decoded = jwt.verify(authCookie.value, secret) as any;

    if (!decoded.sub) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get user details from database
    const user = await prisma.user.findUnique({
      where: { email: decoded.sub },
      select: {
        email: true,
        name: true,
        role: true,
        onboarded: true,
        lastLoginAt: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      email: user.email,
      name: user.name,
      role: user.role,
      onboarded: user.onboarded,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt
    });

  } catch (error) {
    console.error('Auth check failed:', error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
}

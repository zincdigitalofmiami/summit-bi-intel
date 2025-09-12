import { NextResponse } from "next/server";

export async function GET() {
  // Stubbed demo admin response to keep UI flows working in preview/dev
  return NextResponse.json({
    email: "jose@summitmarinedevelopment.com",
    name: "Jose Morales",
    role: "ADMIN",
    onboarded: true,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString()
  });
}

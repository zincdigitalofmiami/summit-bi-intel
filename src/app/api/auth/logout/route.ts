import { NextResponse } from "next/server";

export function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth", "", { path: "/", httpOnly: true, secure: true, sameSite: "lax", maxAge: 0 });
  return res;
}



import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/google-oauth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });
  try {
    const tokens = await exchangeCodeForTokens(code);
    // Temporary: echo token types back; in production store to DB (Vercel Postgres)
    return NextResponse.json({ ok: true, tokens, state });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}



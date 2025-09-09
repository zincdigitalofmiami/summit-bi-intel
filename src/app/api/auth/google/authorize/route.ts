import { NextResponse } from "next/server";
import { buildGoogleAuthorizeUrl } from "@/lib/google-oauth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = (searchParams.get("provider") || "ga4") as any;
  const state = searchParams.get("state") || undefined;
  try {
    const url = buildGoogleAuthorizeUrl(provider, state);
    return NextResponse.redirect(url);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}



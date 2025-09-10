import { NextRequest, NextResponse } from "next/server";
import { createRateLimit } from "@/lib/rate-limit";

const wpLeadLimit = createRateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 50 });

export async function POST(request: NextRequest) {
  const rateLimitResult = wpLeadLimit.check(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Limit': '50', 'X-RateLimit-Remaining': '0' } }
    );
  }
  try {
    const contentType = request.headers.get("content-type") || "";
    let body: any = {};
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await request.formData();
      form.forEach((v, k) => (body[k] = v));
    } else {
      body = await request.json().catch(() => ({}));
    }

    // Simple echo for now; store later in Postgres
    return NextResponse.json({ ok: true, received: body });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}



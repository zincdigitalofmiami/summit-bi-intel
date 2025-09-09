import { NextResponse } from "next/server";

export async function POST(request: Request) {
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



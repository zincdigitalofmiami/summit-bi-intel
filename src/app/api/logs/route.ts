import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const payload = {
			level: String(body?.level || "error"),
			message: String(body?.message || ""),
			data: body?.data ?? null,
			context: body?.context ? String(body.context) : undefined,
			timestamp: body?.timestamp
				? String(body.timestamp)
				: new Date().toISOString(),
			userAgent: String(body?.userAgent || ""),
			url: String(body?.url || ""),
		};

		// For now, just print to server logs. Replace with DB or external logging if desired.
		console.error("client-log", payload);
		return NextResponse.json({ ok: true });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		return NextResponse.json({ ok: false, error: message }, { status: 400 });
	}
}

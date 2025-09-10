import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, leads });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = await prisma.lead.create({ data: body });
    return NextResponse.json({ ok: true, lead });
  } catch (err: any) {
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}



import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, clients });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, type } = body ?? {};
    if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
    const client = await prisma.client.create({ data: { name, email, phone, location, type } });
    return NextResponse.json({ ok: true, client });
  } catch (err: any) {
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}



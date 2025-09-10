import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, projects });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({ data: body });
    return NextResponse.json({ ok: true, project });
  } catch (err: any) {
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}



import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: { client: true },
    });
    if (!project) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true, project });
  } catch (err: any) {
    return NextResponse.json(
      { error: "internal_server_error", detail: String(err?.message || err) },
      { status: 500 },
    );
  }
}



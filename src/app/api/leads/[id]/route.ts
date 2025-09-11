import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    
    const lead = await prisma.lead.update({
      where: { id },
      data: body,
    });
    
    return NextResponse.json({ ok: true, lead });
  } catch (err: any) {
    return NextResponse.json(
      { error: "internal_server_error", detail: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const lead = await prisma.lead.findUnique({
      where: { id },
    });
    
    if (!lead) {
      return NextResponse.json(
        { error: "not_found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ ok: true, lead });
  } catch (err: any) {
    return NextResponse.json(
      { error: "internal_server_error", detail: String(err?.message || err) },
      { status: 500 }
    );
  }
}

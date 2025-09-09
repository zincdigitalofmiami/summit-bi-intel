import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.proposal.delete({ where: { id } });
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to delete proposal" }, { status: 500 });
  }
}


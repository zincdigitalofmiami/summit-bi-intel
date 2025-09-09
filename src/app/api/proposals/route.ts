import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { type ProposalFormData, proposalSchema } from "@/lib/validation";

export async function GET() {
  try {
    const proposals = await prisma.proposal.findMany({
      orderBy: { createdAt: "desc" },
      include: { lineItems: true },
    });
    return NextResponse.json({ status: "ok", count: proposals.length, proposals });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to fetch proposals" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = proposalSchema.safeParse(body as ProposalFormData);
    if (!parsed.success) {
      return NextResponse.json({ status: "error", errors: parsed.error.flatten() }, { status: 400 });
    }
    const data = parsed.data;
    const created = await prisma.proposal.create({
      data: {
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        projectName: data.projectName,
        notes: data.notes,
        lineItems: {
          create: data.lineItems.map((li) => ({ description: li.description, amount: li.amount })),
        },
      },
      include: { lineItems: true },
    });
    return NextResponse.json({ status: "ok", proposal: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to create proposal" }, { status: 500 });
  }
}



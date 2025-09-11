import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generalApiLimit } from "@/lib/rate-limit";
// Note: Prisma decimal fields accept string or number; the client will coerce appropriately.

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const rateLimitResult = generalApiLimit.check(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    );
  }
  
  // Parse pagination parameters
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;
  
  // Get paginated proposals and total count
  const [proposals, total] = await Promise.all([
    prisma.proposal.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { lineItems: true },
    }),
    prisma.proposal.count(),
  ]);
  
  return NextResponse.json({
    ok: true,
    proposals,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const rateLimitResult = generalApiLimit.check(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    );
  }
  try {
    const body = await request.json();

    const lineItemsInput = Array.isArray(body?.lineItems)
      ? body.lineItems.map((li: any) => ({
          description: String(li?.description ?? ""),
          amount:
            typeof li?.amount === "number" || typeof li?.amount === "string"
              ? li.amount
              : 0,
        }))
      : [];

    const created = await prisma.proposal.create({
      data: {
        clientName: String(body?.clientName ?? ""),
        clientEmail: String(body?.clientEmail ?? ""),
        projectName: String(body?.projectName ?? ""),
        notes: body?.notes ? String(body.notes) : undefined,
        lineItems: {
          create: lineItemsInput,
        },
      },
      include: { lineItems: true },
    });

    return NextResponse.json({ ok: true, proposal: created });
  } catch (err: any) {
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}



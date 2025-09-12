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
      include: { lineItems: true, client: true },
    }),
    prisma.proposal.count(),
  ]);
  
  const proposalsResponse = proposals.map((p: any) => ({ ...p, clientName: p.client?.name ?? null, clientEmail: p.client?.email ?? null }));

  return NextResponse.json({
    ok: true,
    proposals: proposalsResponse,
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

    // Prefer relational client if provided; otherwise derive from name/email
    let clientId: string | undefined = body?.clientId || undefined;
    if (!clientId) {
      const candidateEmail = body?.clientEmail ? String(body.clientEmail) : undefined;
      const candidateName = body?.clientName ? String(body.clientName) : undefined;
      if (candidateEmail || candidateName) {
        const existing = await prisma.client.findFirst({
          where: {
            OR: [
              candidateEmail ? { email: candidateEmail } : undefined,
              candidateName ? { name: candidateName } : undefined,
            ].filter(Boolean) as any,
          },
          select: { id: true },
        });
        if (existing) {
          clientId = existing.id;
        } else if (candidateName) {
          const createdClient = await prisma.client.create({
            data: { name: candidateName, email: candidateEmail },
            select: { id: true },
          });
          clientId = createdClient.id;
        }
      }
    }
    const created = await prisma.proposal.create({
      data: {
        clientId,
        projectName: String(body?.projectName ?? ""),
        notes: body?.notes ? String(body.notes) : undefined,
        lineItems: { create: lineItemsInput },
      },
      include: { lineItems: true, client: true },
    });

    // Back-compat: derive denormalized fields for UI using existing expectations
    const responseProposal: any = {
      ...created,
      clientName: created.client?.name ?? String(body?.clientName ?? ""),
      clientEmail: created.client?.email ?? String(body?.clientEmail ?? ""),
    };

    return NextResponse.json({ ok: true, proposal: responseProposal });
  } catch (err: any) {
    return NextResponse.json({ error: "internal_server_error", detail: String(err?.message || err) }, { status: 500 });
  }
}



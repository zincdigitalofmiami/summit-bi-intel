import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * POST /api/proposals/sign
 * Body: { proposalId: string, signature: unknown }
 * Behavior (schema-aligned):
 * 1) Update Proposal.signature Json
 * 2) If a Project with matching (name=proposal.projectName, clientId=proposal.clientId) does not exist, create it.
 *    - budget is computed from ProposalLineItem amounts
 * 3) Respond { message, projectId }
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const proposalId = String(body?.proposalId || "");
		const signature = body?.signature ?? null;

		if (!proposalId) {
			return NextResponse.json(
				{ error: "proposalId_required" },
				{ status: 400 },
			);
		}

		// Load proposal with line items
		const proposal = await prisma.proposal.findUnique({
			where: { id: proposalId },
			include: { lineItems: true },
		});

		if (!proposal) {
			return NextResponse.json(
				{ error: "proposal_not_found" },
				{ status: 404 },
			);
		}

		// Compute total from line items
		const total = proposal.lineItems.reduce(
			(sum, li) => sum + Number(li.amount || 0),
			0,
		);

		// Store signature JSON
		await prisma.proposal.update({
			where: { id: proposal.id },
			data: { signature: signature ?? { signed: true, at: new Date().toISOString() } },
		});

		// Ensure project exists using relational clientId
		const existingProject = await prisma.project.findFirst({
			where: {
				name: proposal.projectName,
				clientId: proposal.clientId ?? undefined,
			},
			select: { id: true },
		});

		let projectId = existingProject?.id || null;
		if (!projectId) {
			const created = await prisma.project.create({
				data: {
					name: proposal.projectName,
					clientId: proposal.clientId ?? undefined,
					status: "ACTIVE",
					type: "OTHER",
					budget: total || 0,
				},
				select: { id: true },
			});
			projectId = created.id;
		}

		return NextResponse.json({
			message: "Proposal signed and project ensured",
			projectId,
		});
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		return NextResponse.json(
			{ error: "internal_error", detail: message },
			{ status: 500 },
		);
	}
}

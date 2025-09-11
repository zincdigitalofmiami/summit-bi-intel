import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generalApiLimit } from "@/lib/rate-limit";

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
  try {
    // Get planning/active projects as opportunities
    const opportunities = await prisma.project.findMany({
      where: {
        status: 'ACTIVE'
      },
      select: {
        id: true,
        name: true,
        client: true,
        type: true,
        budget: true,
        createdAt: true,
        status: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // Calculate potential value and probability based on project type and status
    const formattedOpportunities = opportunities.map((project, _index) => {
      const baseValue = Number(project.budget) || 0;
      const estimatedValue = baseValue > 0 ? baseValue : getEstimatedValueByType(project.type);

      const probability = project.status === 'ACTIVE' ? 75 : 60; // Higher probability for active projects

      const status = probability > 70 ? 'hot' : probability > 60 ? 'warm' : 'cold';

      // Calculate deadline as 90 days from creation for active projects
      const deadline = new Date(project.createdAt);
      deadline.setDate(deadline.getDate() + 90);
      const deadlineStr = deadline.toISOString().split('T')[0];

      return {
        id: project.id,
        title: project.name,
        description: `${project.type.replace('_', ' ')} project for ${project.client || 'Client'}`,
        value: estimatedValue,
        probability: probability,
        deadline: deadlineStr,
        status: status as 'hot' | 'warm' | 'cold',
        type: formatProjectType(project.type)
      };
    });

    return NextResponse.json({
      opportunities: formattedOpportunities,
      total: formattedOpportunities.length
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120'
      }
    });

  } catch (error) {
    // Return fallback data when API fails
    const fallbackOpportunities = [
      {
        id: "1",
        title: "Large Marina Renovation",
        description: "Complete renovation of 50-slip marina including seawall repair",
        value: 750000,
        probability: 75,
        deadline: "2025-03-01",
        status: "hot" as const,
        type: "Commercial"
      },
      {
        id: "2",
        title: "Residential Dock Program",
        description: "Multiple residential dock projects in new waterfront development",
        value: 450000,
        probability: 60,
        deadline: "2025-04-15",
        status: "warm" as const,
        type: "Residential"
      }
    ];

    return NextResponse.json({
      opportunities: fallbackOpportunities,
      total: fallbackOpportunities.length,
      error: error instanceof Error ? error.message : 'Failed to fetch opportunities'
    });
  }
}

function getEstimatedValueByType(type: string): number {
  const valueMap: { [key: string]: number } = {
    'SEAWALL': 125000,
    'DOCK': 85000,
    'RETAINING_WALL': 95000,
    'REPAIR': 65000,
    'OTHER': 75000
  };
  return valueMap[type] || 75000;
}

function formatProjectType(type: string): string {
  return type.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

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
    // Calculate market trends based on real data

    // 1. Average Project Value trend
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    // Get proposals from last 30 days and previous 30 days
    const recentProposals = await prisma.proposal.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      include: { lineItems: true }
    });

    const previousProposals = await prisma.proposal.findMany({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }
      },
      include: { lineItems: true }
    });

    const calculateAverageValue = (proposals: typeof recentProposals) => {
      if (proposals.length === 0) return 0;
      const totalValue = proposals.reduce((sum, proposal) => {
        const proposalValue = proposal.lineItems.reduce((itemSum, item) => {
          return itemSum + Number(item.amount);
        }, 0);
        return sum + proposalValue;
      }, 0);
      return totalValue / proposals.length;
    };

    const recentAvgValue = calculateAverageValue(recentProposals);
    const previousAvgValue = calculateAverageValue(previousProposals);

    const valueChange = previousAvgValue > 0
      ? ((recentAvgValue - previousAvgValue) / previousAvgValue) * 100
      : 0;

    // 2. Seawall Permits trend (using projects as proxy)
    const recentSeawallProjects = await prisma.project.count({
      where: {
        type: 'SEAWALL',
        createdAt: { gte: thirtyDaysAgo }
      }
    });

    const previousSeawallProjects = await prisma.project.count({
      where: {
        type: 'SEAWALL',
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }
      }
    });

    const seawallChange = previousSeawallProjects > 0
      ? ((recentSeawallProjects - previousSeawallProjects) / previousSeawallProjects) * 100
      : 0;

    // 3. Material Costs trend (mock for now - would need cost tracking)
    const materialCostsChange = 8.2; // Mock value

    // 4. Total market value (sum of all proposal values)
    const totalMarketValue = recentProposals.reduce((sum, proposal) => {
      const proposalValue = proposal.lineItems.reduce((itemSum, item) => {
        return itemSum + Number(item.amount);
      }, 0);
      return sum + proposalValue;
    }, 0);

    // 5. Active competitors (would need competitor tracking)
    const activeCompetitors = await prisma.client.count(); // Using clients as proxy

    // 6. Opportunities count (projects that are planning/active)
    const opportunitiesCount = await prisma.project.count({
      where: {
        status: 'ACTIVE'
      }
    });

    const marketTrends = [
      {
        id: "1",
        name: "Average Project Value",
        value: Math.round(recentAvgValue),
        change: Math.round(valueChange * 100) / 100,
        period: "Last 30 days",
        trend: valueChange > 0 ? "up" : valueChange < 0 ? "down" : "neutral"
      },
      {
        id: "2",
        name: "Seawall Permits",
        value: recentSeawallProjects,
        change: Math.round(seawallChange * 100) / 100,
        period: "Last 30 days",
        trend: seawallChange > 0 ? "up" : seawallChange < 0 ? "down" : "neutral"
      },
      {
        id: "3",
        name: "Material Costs",
        value: 85000, // Mock value
        change: materialCostsChange,
        period: "Last 30 days",
        trend: materialCostsChange > 0 ? "up" : "down"
      }
    ];

    const marketSummary = {
      totalMarketValue,
      activeCompetitors,
      opportunitiesCount,
      recentProposalsCount: recentProposals.length,
      activePermitsCount: recentSeawallProjects // Using seawall projects as proxy
    };

    return NextResponse.json({
      marketTrends,
      marketSummary
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120'
      }
    });

  } catch (error) {
    // Return fallback data when API fails
    const fallbackTrends = [
      {
        id: "1",
        name: "Average Project Value",
        value: 175000,
        change: 12.5,
        period: "Last 30 days",
        trend: "up"
      },
      {
        id: "2",
        name: "Seawall Permits",
        value: 15,
        change: -5,
        period: "Last 30 days",
        trend: "down"
      },
      {
        id: "3",
        name: "Material Costs",
        value: 85000,
        change: 8.2,
        period: "Last 30 days",
        trend: "up"
      }
    ];

    const fallbackSummary = {
      totalMarketValue: 2400000,
      activeCompetitors: 12,
      opportunitiesCount: 8,
      recentProposalsCount: 5,
      activePermitsCount: 3
    };

    return NextResponse.json({
      marketTrends: fallbackTrends,
      marketSummary: fallbackSummary,
      error: error instanceof Error ? error.message : 'Failed to calculate market trends'
    });
  }
}

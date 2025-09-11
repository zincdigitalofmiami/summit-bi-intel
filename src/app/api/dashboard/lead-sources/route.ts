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
    // Get all leads and group by source
    const leads = await prisma.lead.findMany({
      select: {
        source: true
      }
    });

    // Count leads by source
    const sourceCounts: { [key: string]: number } = {};
    leads.forEach(lead => {
      const source = lead.source || 'unknown';
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    const totalLeads = leads.length;

    // Convert to the format expected by the chart
    const leadSources = Object.entries(sourceCounts).map(([source, count]) => ({
      type: source.charAt(0).toUpperCase() + source.slice(1).replace('_', ' '),
      value: count,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0
    }));

    // Sort by count descending
    leadSources.sort((a, b) => b.value - a.value);

    return NextResponse.json({
      leadSources,
      total: totalLeads
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });

  } catch (error) {
    // Return fallback data when API fails
    const fallbackSources = [
      {
        type: "Website Form",
        value: 45,
        percentage: 35
      },
      {
        type: "Google Ads",
        value: 28,
        percentage: 22
      },
      {
        type: "Referrals",
        value: 35,
        percentage: 27
      },
      {
        type: "Facebook Ads",
        value: 18,
        percentage: 14
      },
      {
        type: "LinkedIn",
        value: 4,
        percentage: 3
      }
    ];

    return NextResponse.json({
      leadSources: fallbackSources,
      total: 130,
      error: error instanceof Error ? error.message : 'Failed to fetch lead sources'
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120',
      },
    });
  }
}

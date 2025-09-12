import { NextResponse } from "next/server";
import { competitors } from "@/data/competitors";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const insights = await buildInsights();
    return NextResponse.json({
      status: "ok",
      insights,
      generatedAt: new Date().toISOString(),
      totalInsights: insights.length
    });
  } catch (error) {
    return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 500 });
  }
}

async function buildInsights() {
  const items: Array<{
    title: string;
    detail: string;
    severity: "low" | "medium" | "high";
    category: string;
    actionable: boolean;
    confidence: number;
  }> = [];

  try {
    // Get real data from database
    const projects = await prisma.project.findMany({
      include: { client: true },
    });

    const leads = await prisma.lead.findMany();
    const proposals = await prisma.proposal.findMany({
      include: { lineItems: true }
    });

    // 1. Project Status Insights
    const activeProjects = projects.filter(p => p.status === 'ACTIVE');
    const completedProjects = projects.filter(p => p.status === 'COMPLETED');
    const onHoldProjects = projects.filter(p => p.status === 'ON_HOLD');

    if (activeProjects.length > 10) {
      items.push({
        title: "High Project Load",
        detail: `Currently managing ${activeProjects.length} active projects. Consider resource allocation optimization.`,
        severity: "medium",
        category: "Operations",
        actionable: true,
        confidence: 95
      });
    }

    if (onHoldProjects.length > 0) {
      items.push({
        title: "Projects on Hold",
        detail: `${onHoldProjects.length} project(s) are currently on hold. Review and restart if appropriate.`,
        severity: "medium",
        category: "Operations",
        actionable: true,
        confidence: 90
      });
    }

    // 2. Lead Conversion Insights
    const recentLeads = leads.filter(l => {
      const leadDate = new Date(l.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return leadDate > thirtyDaysAgo;
    });

    if (recentLeads.length > 0) {
      const conversionRate = (proposals.length / recentLeads.length) * 100;
      if (conversionRate < 10) {
        items.push({
          title: "Low Lead Conversion",
          detail: `Only ${conversionRate.toFixed(1)}% of recent leads converted to proposals. Consider lead qualification process.`,
          severity: "high",
          category: "Sales",
          actionable: true,
          confidence: 85
        });
      }
    }

    // 3. Revenue Insights
    const totalRevenue = proposals.reduce((sum, p) =>
      sum + p.lineItems.reduce((itemSum, item) => itemSum + Number(item.amount), 0), 0
    );

    const monthlyRevenue = totalRevenue / 12; // Rough estimate

    if (monthlyRevenue < 50000) {
      items.push({
        title: "Revenue Optimization Opportunity",
        detail: `Monthly revenue estimate: $${monthlyRevenue.toLocaleString()}. Consider pricing strategy or marketing campaigns.`,
        severity: "medium",
        category: "Finance",
        actionable: true,
        confidence: 75
      });
    }

    // 4. Client Insights
    const uniqueClients = new Set(
      projects.map(p => p.client?.name ?? p.clientId).filter(Boolean)
    );

    const repeatClients = projects.filter(p => {
      const id = p.client?.name ?? p.clientId;
      return (
        id &&
        projects.filter(op => (op.client?.name ?? op.clientId) === id).length > 1
      );
    }).length;

    if (uniqueClients.size > 0 && repeatClients / uniqueClients.size < 0.3) {
      items.push(
        {
          title: "Client Retention Opportunity",
          detail: "Most of your clients are one-time, consider building long-term relationships.",
          severity: "medium",
          category: "Customer Success",
          actionable: true,
          confidence: 80
        }
      );
    }

    // 5. Competitor Insights (from existing data)
    for (const c of competitors) {
      if (c.licensing?.status && /inactive/i.test(c.licensing.status)) {
        items.push({
          title: `License Alert: ${c.name}`,
          detail: `${c.name} licensing appears inactive — verify before procurement.`,
          severity: "high",
          category: "Compliance",
          actionable: true,
          confidence: 95
        });
      }

      // Enhanced competitor analysis
      if (Array.isArray((c as any).strengths) && (c as any).strengths.length >= 3) {
        items.push({
          title: `Strong Competitor: ${c.name}`,
          detail: `${c.name} shows strong market positioning. Monitor their pricing and service offerings.`,
          severity: "medium",
          category: "Market Intelligence",
          actionable: true,
          confidence: 70
        });
      }
    }

    // 6. Seasonal Insights
    const currentMonth = new Date().getMonth();
    const isPeakSeason = currentMonth >= 5 && currentMonth <= 9; // June-October peak season

    if (isPeakSeason && activeProjects.length < 5) {
      items.push({
        title: "Peak Season Opportunity",
        detail: "Currently in peak marine construction season. Consider increasing marketing spend for lead generation.",
        severity: "medium",
        category: "Marketing",
        actionable: true,
        confidence: 85
      });
    }

  } catch (error) {
    console.warn('Error building insights:', error);
  }

  // Fallback insights if database is empty
  if (items.length === 0) {
    items.push(
      {
        title: "Welcome to AI Insights",
        detail: "Add project data, leads, and proposals to receive personalized business intelligence.",
        severity: "low",
        category: "Setup",
        actionable: false,
        confidence: 100
      },
      {
        title: "Connect Google Analytics",
        detail: "Integrate Google Analytics to get website traffic and conversion insights.",
        severity: "low",
        category: "Integration",
        actionable: true,
        confidence: 95
      },
      {
        title: "Set Up Lead Enrichment",
        detail: "Configure lead enrichment to automatically gather contact information and company data.",
        severity: "low",
        category: "Sales",
        actionable: true,
        confidence: 90
      }
    );
  }

  // Sort by severity and confidence
  return items
    .sort((a, b) => {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      return b.confidence - a.confidence;
    })
    .slice(0, 15); // Return top 15 insights
}



import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 30; // 30 seconds for enrichment operations

// Mock enrichment data - in production, integrate with Clearbit, Hunter.io, etc.
const mockEnrichmentData = {
  "jose@summitmarinedevelopment.com": {
    name: "Jose Morales",
    title: "President",
    company: "Summit Marine Development",
    location: "Panama City, FL",
    website: "https://summitmarine.com",
    phone: "+1 (850) 555-0123",
    linkedin: "https://linkedin.com/in/jose-morales",
    industry: "Construction - Marine",
    companySize: "11-50",
    revenue: "$1M-$5M"
  },
  "contact@panamacondos.com": {
    name: "Maria Rodriguez",
    title: "Property Manager",
    company: "Panama City Condos LLC",
    location: "Panama City Beach, FL",
    website: "https://panamacondos.com",
    phone: "+1 (850) 555-0456",
    linkedin: "https://linkedin.com/in/maria-rodriguez",
    industry: "Real Estate",
    companySize: "51-200",
    revenue: "$5M-$10M"
  }
};

export async function POST(request: NextRequest) {
  try {
    const { email, leadId } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if lead exists
    let lead;
    if (leadId) {
      lead = await prisma.lead.findUnique({
        where: { id: leadId }
      });
    } else {
      lead = await prisma.lead.findFirst({
        where: { contactEmail: email }
      });
    }

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Get enrichment data (mock for now)
    const enrichmentData = mockEnrichmentData[email as keyof typeof mockEnrichmentData];

    if (!enrichmentData) {
      // Generate basic enrichment for unknown emails
      const domain = email.split('@')[1];
      const basicEnrichment = {
        name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        title: "Contact",
        company: domain.replace(/\.(com|org|net|edu)$/, '').replace(/[.-]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        location: "Panama City, FL",
        website: `https://${domain}`,
        industry: "Construction",
        companySize: "Unknown",
        revenue: "Unknown",
        enriched: false
      };

      // Update lead with basic enrichment
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          name: basicEnrichment.name,
          contactEmail: email,
          companyName: basicEnrichment.company,
          notes: `${lead.notes || ''}\n\nEnriched: ${new Date().toISOString()}`.trim()
        }
      });

      return NextResponse.json({
        status: "ok",
        enriched: false,
        data: basicEnrichment,
        message: "Basic enrichment completed"
      });
    }

    // Update lead with full enrichment
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        name: enrichmentData.name,
        contactEmail: email,
        companyName: enrichmentData.company,
        notes: `${lead.notes || ''}\n\nEnriched: ${new Date().toISOString()}
Company: ${enrichmentData.company}
Title: ${enrichmentData.title}
Industry: ${enrichmentData.industry}
Size: ${enrichmentData.companySize}
Revenue: ${enrichmentData.revenue}
Website: ${enrichmentData.website}
Phone: ${enrichmentData.phone}`.trim()
      }
    });

    return NextResponse.json({
      status: "ok",
      enriched: true,
      data: enrichmentData,
      message: "Lead enriched successfully"
    });

  } catch (error) {
    console.error('Lead enrichment error:', error);
    return NextResponse.json({
      status: "error",
      message: "Failed to enrich lead"
    }, { status: 500 });
  }
}

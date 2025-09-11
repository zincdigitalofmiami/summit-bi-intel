import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";
import { ensureTables, readCache, writeCache } from "@/lib/db";

interface MarinePermit {
  source: string;
  jurisdiction: string;
  permit_id: string;
  project_type: string;
  description: string;
  address: string;
  applicant: string;
  status: string;
  issue_date: string;
  expiration_date?: string;
  contractor_license?: string;
  parcel_number?: string;
  lat?: number;
  lng?: number;
  estimated_cost?: number;
  inspections?: Array<{
    type: string;
    status: string;
    date: string;
  }>;
  documents?: Array<{
    type: string;
    url: string;
  }>;
  last_updated: string;
}

// Marine construction keywords to filter permits
const MARINE_KEYWORDS = [
  "dock",
  "seawall",
  "piling",
  "dredging",
  "jetty",
  "pier",
  "retaining wall",
  "bulkhead",
  "marina",
  "boat ramp",
  "floating dock",
  "mooring",
  "breakwater",
];

function parseProjectType(description: string): string {
  const desc = description.toLowerCase();
  if (desc.includes("seawall")) return "seawall";
  if (desc.includes("dock")) return "dock";
  if (desc.includes("piling")) return "piling";
  if (desc.includes("dredging")) return "dredging";
  if (desc.includes("jetty")) return "jetty";
  if (desc.includes("pier")) return "pier";
  if (desc.includes("retaining wall")) return "retaining wall";
  if (desc.includes("bulkhead")) return "bulkhead";
  if (desc.includes("marina")) return "marina";
  if (desc.includes("boat ramp")) return "boat ramp";
  return "marine construction";
}

function isMarineRelated(description: string): boolean {
  const desc = description.toLowerCase();
  return MARINE_KEYWORDS.some((keyword) => desc.includes(keyword));
}

async function scrapeBayCounty(): Promise<MarinePermit[]> {
  try {
    // Bay County Permit Portal - this would need authentication in production
    const response = await fetch(
      "https://portal.baycountyfl.gov/PermitSearch",
      {
        headers: {
          "User-Agent": "SummitBI/1.0 (Marine Construction Intelligence)",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Bay County portal returned ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const permits: MarinePermit[] = [];

    // Look for permit tables or cards
    $(".permit-row, .permit-card, tr").each((_, element) => {
      const $el = $(element);
      const description = $el
        .find(".description, .project-desc, td:nth-child(2)")
        .text()
        .trim();

      if (isMarineRelated(description)) {
        const permit: MarinePermit = {
          source: "baycounty",
          jurisdiction: "Bay County, FL",
          permit_id:
            $el.find(".permit-id, td:nth-child(1)").text().trim() || "N/A",
          project_type: parseProjectType(description),
          description,
          address: $el.find(".address, td:nth-child(3)").text().trim() || "N/A",
          applicant:
            $el.find(".applicant, td:nth-child(4)").text().trim() || "N/A",
          status:
            $el.find(".status, td:nth-child(5)").text().trim() || "Unknown",
          issue_date:
            $el.find(".issue-date, td:nth-child(6)").text().trim() ||
            new Date().toISOString().split("T")[0],
          last_updated: new Date().toISOString(),
        };
        permits.push(permit);
      }
    });

    return permits;
  } catch (error) {
    console.error("Bay County scraping error:", error);
    return [];
  }
}

async function scrapePanamaCity(): Promise<MarinePermit[]> {
  try {
    // Panama City CloudPermit - would need authentication
    const response = await fetch("https://panamacity.cloudpermit.com/", {
      headers: {
        "User-Agent": "SummitBI/1.0 (Marine Construction Intelligence)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Panama City CloudPermit returned ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const permits: MarinePermit[] = [];

    // Look for permit cards or listings
    $(".permit-card, .project-card, .permit-item").each((_, element) => {
      const $el = $(element);
      const description = $el
        .find(".description, .project-description, .permit-desc")
        .text()
        .trim();

      if (isMarineRelated(description)) {
        const permit: MarinePermit = {
          source: "panamacity",
          jurisdiction: "Panama City, FL",
          permit_id:
            $el.find(".permit-number, .permit-id").text().trim() || "N/A",
          project_type: parseProjectType(description),
          description,
          address: $el.find(".address, .location").text().trim() || "N/A",
          applicant: $el.find(".applicant, .contractor").text().trim() || "N/A",
          status:
            $el.find(".status, .permit-status").text().trim() || "Unknown",
          issue_date:
            $el.find(".issue-date, .created-date").text().trim() ||
            new Date().toISOString().split("T")[0],
          last_updated: new Date().toISOString(),
        };
        permits.push(permit);
      }
    });

    return permits;
  } catch (error) {
    console.error("Panama City scraping error:", error);
    return [];
  }
}

async function scrapePanamaCityBeach(): Promise<MarinePermit[]> {
  try {
    // Panama City Beach Permit Portal
    const response = await fetch(
      "https://www.pcbfl.gov/departments/building-planning-department/building/permit-and-inspection-search",
      {
        headers: {
          "User-Agent": "SummitBI/1.0 (Marine Construction Intelligence)",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`PCB portal returned ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const permits: MarinePermit[] = [];

    // Look for permit search results
    $(".permit-result, .search-result, tr").each((_, element) => {
      const $el = $(element);
      const description = $el
        .find(".description, .project-desc, td:nth-child(2)")
        .text()
        .trim();

      if (isMarineRelated(description)) {
        const permit: MarinePermit = {
          source: "pcb",
          jurisdiction: "Panama City Beach, FL",
          permit_id:
            $el.find(".permit-id, td:nth-child(1)").text().trim() || "N/A",
          project_type: parseProjectType(description),
          description,
          address: $el.find(".address, td:nth-child(3)").text().trim() || "N/A",
          applicant:
            $el.find(".applicant, td:nth-child(4)").text().trim() || "N/A",
          status:
            $el.find(".status, td:nth-child(5)").text().trim() || "Unknown",
          issue_date:
            $el.find(".issue-date, td:nth-child(6)").text().trim() ||
            new Date().toISOString().split("T")[0],
          last_updated: new Date().toISOString(),
        };
        permits.push(permit);
      }
    });

    return permits;
  } catch (error) {
    console.error("PCB scraping error:", error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source") || "all";
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    await ensureTables();
    const cached = await readCache("permits_cache");
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 5000);
    let allPermits: MarinePermit[] = [];

    if (source === "all" || source === "baycounty") {
      const bayCountyPermits = await scrapeBayCounty();
      allPermits = [...allPermits, ...bayCountyPermits];
    }

    if (source === "all" || source === "panamacity") {
      const panamaCityPermits = await scrapePanamaCity();
      allPermits = [...allPermits, ...panamaCityPermits];
    }

    if (source === "all" || source === "pcb") {
      const pcbPermits = await scrapePanamaCityBeach();
      allPermits = [...allPermits, ...pcbPermits];
    }

    clearTimeout(t);
    // Sort by issue date (newest first) and limit results
    allPermits.sort(
      (a, b) =>
        new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime(),
    );
    const limitedPermits = allPermits.slice(0, limit);

    const payload = {
      success: true,
      count: limitedPermits.length,
      total_found: allPermits.length,
      permits: limitedPermits,
      last_updated: new Date().toISOString(),
    } as const;
    await writeCache("permits_cache", payload);
    return NextResponse.json(payload, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400" } });
  } catch (error) {
    console.error("Panama permits scraping error:", error);
    try {
      const fallback = await readCache("permits_cache");
      if (fallback) {
        return NextResponse.json(fallback, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400" } });
      }
    } catch {}
    return NextResponse.json({ success: true, count: 0, total_found: 0, permits: [], last_updated: new Date().toISOString() });
  }
}

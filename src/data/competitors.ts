export interface Competitor {
  id: string;
  name: string;
  website: string;
  phone: string;
  address: string;
  services: string[];
  licensing: {
    status: "active" | "inactive" | "unknown";
    details: string;
    lastVerified: string;
  };
  strengths: string[];
  risks: string[];
  establishedYear?: number;
  lastUpdated: string;
}

export const competitors: Competitor[] = [
  {
    id: "carl-vernon-marine",
    name: "Carl Vernon's Marine Specialties",
    website: "vernonmarineconstruction.com/docks",
    phone: "(850) 258-8349",
    address: "3574 East Business Hwy 98, Panama City, FL 32401",
    services: [
      "Full-service dock installation and restoration",
      "Floating and stationary docks",
      "Boathouses and boat lifts",
      "Wharves and erosion control",
      "Demolitions and permit handling",
      "Custom add-ons (fish-cleaning stations, benches, sun decks)"
    ],
    licensing: {
      status: "inactive",
      details: "Carl Vernon Construction Co., Inc. listed as inactive per Florida Division of Corporations (sunbiz), last filings in 2006. BuildZoom reports multiple Bay County contractor licenses under Carl M. Vernon III (e.g., RB0019787), all currently inactive as of May 18, 2025.",
      lastVerified: "2025-05-18"
    },
    strengths: [
      "Full-service marine builds",
      "Permitting convenience",
      "Decades of experience",
      "Custom upgrade features"
    ],
    risks: [
      "Licensing status appears inactive",
      "Requires verification before procurement",
      "Potential regulatory compliance issues"
    ],
    lastUpdated: "2025-01-20T10:00:00Z"
  },
  {
    id: "bb-marine-team",
    name: "B & B Marine Team",
    website: "bandbmarineteam.com",
    phone: "(850) 686-9182",
    address: "2910 Glenview Ave, Panama City, FL 32405",
    services: [
      "High-quality custom docks",
      "Decks and boat lifts",
      "Seawalls and piers",
      "Piling installation",
      "Erosion-control solutions",
      "Personalized service throughout Bay County"
    ],
    licensing: {
      status: "active",
      details: "Registered with Florida Division of Corporations as B&B Marine Team LLC, active since May 24, 2023 (document number L23000254254); filed annual report as of March 31, 2024.",
      lastVerified: "2024-03-31"
    },
    strengths: [
      "Licensed and insured",
      "Modern brand with craftsmanship focus",
      "Strong social proof and testimonials",
      "Transparent pricing",
      "Timeliness and client satisfaction"
    ],
    risks: [
      "Newer business (est. 2023)",
      "May lack long-term track record",
      "Limited large-scale project experience"
    ],
    establishedYear: 2023,
    lastUpdated: "2025-01-20T10:00:00Z"
  }
];

export const competitorInsights = {
  summary: "Two primary competitors in Panama City marine construction market with contrasting profiles.",
  keyFindings: [
    "Carl Vernon's has extensive experience but licensing concerns",
    "B&B Marine Team is newer but properly licensed and active",
    "Market opportunity exists for established, licensed competitor like Summit Marine"
  ],
  actionItems: [
    "Build automated license checker for Florida Division of Corporations",
    "Track competitor web updates and service changes",
    "Generate weekly AI insights on competitive positioning"
  ],
  lastAnalysis: "2025-01-20T10:00:00Z"
};

export function getActiveCompetitors(): Competitor[] {
  return competitors.filter(c => c.licensing.status === "active");
}

export function getCompetitorsByLicenseStatus(status: "active" | "inactive" | "unknown"): Competitor[] {
  return competitors.filter(c => c.licensing.status === status);
}

export function getCompetitorRisks(): Array<{competitor: string; risks: string[]}> {
  return competitors.map(c => ({
    competitor: c.name,
    risks: c.risks
  }));
}

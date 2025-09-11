import { NextRequest, NextResponse } from "next/server";

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

// Demo data for Panama City area marine permits
const demoPermits: MarinePermit[] = [
  {
    source: "baycounty",
    jurisdiction: "Bay County, FL",
    permit_id: "BC-2025-001234",
    project_type: "seawall",
    description: "Repair of 80ft vinyl seawall at waterfront property",
    address: "123 Coastal Drive, Panama City, FL 32401",
    applicant: "Summit Marine Development",
    status: "Approved",
    issue_date: "2025-01-15",
    expiration_date: "2025-07-15",
    contractor_license: "FL-CGC1234567",
    parcel_number: "X12345-6789",
    lat: 30.1584,
    lng: -85.6608,
    estimated_cost: 48000,
    inspections: [
      {
        type: "Footing",
        status: "Passed",
        date: "2025-01-18",
      },
      {
        type: "Final",
        status: "Scheduled",
        date: "2025-01-25",
      },
    ],
    documents: [
      {
        type: "Permit PDF",
        url: "https://portal.baycountyfl.gov/permit12345.pdf",
      },
    ],
    last_updated: "2025-01-20T10:30:00Z",
  },
  {
    source: "panamacity",
    jurisdiction: "Panama City, FL",
    permit_id: "PC-2025-005678",
    project_type: "dock",
    description: "Construction of 40ft floating dock with boat lift",
    address: "456 Harbor View Lane, Panama City, FL 32401",
    applicant: "Coastal Construction LLC",
    status: "Under Review",
    issue_date: "2025-01-10",
    contractor_license: "FL-CGC9876543",
    parcel_number: "Y98765-4321",
    lat: 30.1612,
    lng: -85.6555,
    estimated_cost: 75000,
    inspections: [
      {
        type: "Piling",
        status: "Pending",
        date: "2025-01-28",
      },
    ],
    last_updated: "2025-01-18T14:15:00Z",
  },
  {
    source: "pcb",
    jurisdiction: "Panama City Beach, FL",
    permit_id: "PCB-2025-009876",
    project_type: "piling",
    description: "Installation of 12 concrete pilings for pier extension",
    address: "789 Beachfront Boulevard, Panama City Beach, FL 32413",
    applicant: "Gulf Coast Marine Services",
    status: "Issued",
    issue_date: "2025-01-12",
    expiration_date: "2025-07-12",
    contractor_license: "FL-CGC5555555",
    parcel_number: "Z55555-1234",
    lat: 30.1761,
    lng: -85.8055,
    estimated_cost: 32000,
    inspections: [
      {
        type: "Foundation",
        status: "Passed",
        date: "2025-01-16",
      },
      {
        type: "Structural",
        status: "In Progress",
        date: "2025-01-22",
      },
    ],
    documents: [
      {
        type: "Engineering Plans",
        url: "https://www.pcbfl.gov/permits/9876-plans.pdf",
      },
    ],
    last_updated: "2025-01-19T09:45:00Z",
  },
  {
    source: "baycounty",
    jurisdiction: "Bay County, FL",
    permit_id: "BC-2025-001235",
    project_type: "dredging",
    description: "Channel dredging for boat access - 150ft x 20ft",
    address: "321 Marina Way, Panama City, FL 32401",
    applicant: "Bay Marine Contractors",
    status: "Approved",
    issue_date: "2025-01-08",
    expiration_date: "2025-04-08",
    contractor_license: "FL-CGC7777777",
    parcel_number: "A77777-8888",
    lat: 30.1523,
    lng: -85.6689,
    estimated_cost: 125000,
    inspections: [
      {
        type: "Environmental",
        status: "Passed",
        date: "2025-01-14",
      },
      {
        type: "Depth Check",
        status: "Scheduled",
        date: "2025-01-26",
      },
    ],
    documents: [
      {
        type: "Environmental Impact",
        url: "https://portal.baycountyfl.gov/env1235.pdf",
      },
      {
        type: "Dredging Plan",
        url: "https://portal.baycountyfl.gov/dredge1235.pdf",
      },
    ],
    last_updated: "2025-01-17T16:20:00Z",
  },
  {
    source: "panamacity",
    jurisdiction: "Panama City, FL",
    permit_id: "PC-2025-005679",
    project_type: "retaining wall",
    description:
      "Replacement of 60ft concrete retaining wall with erosion control",
    address: "654 Waterfront Drive, Panama City, FL 32401",
    applicant: "Summit Marine Development",
    status: "Pending",
    issue_date: "2025-01-05",
    contractor_license: "FL-CGC1234567",
    parcel_number: "B11111-2222",
    lat: 30.1598,
    lng: -85.6623,
    estimated_cost: 68000,
    inspections: [
      {
        type: "Site Prep",
        status: "Pending",
        date: "2025-01-30",
      },
    ],
    last_updated: "2025-01-16T11:30:00Z",
  },
  {
    source: "pcb",
    jurisdiction: "Panama City Beach, FL",
    permit_id: "PCB-2025-009877",
    project_type: "jetty",
    description: "Construction of 100ft rock jetty for wave protection",
    address: "987 Gulf Shore Drive, Panama City Beach, FL 32413",
    applicant: "Beachfront Engineering",
    status: "Issued",
    issue_date: "2025-01-03",
    expiration_date: "2025-06-03",
    contractor_license: "FL-CGC9999999",
    parcel_number: "C99999-3333",
    lat: 30.1789,
    lng: -85.8123,
    estimated_cost: 180000,
    inspections: [
      {
        type: "Foundation",
        status: "Passed",
        date: "2025-01-10",
      },
      {
        type: "Rock Placement",
        status: "In Progress",
        date: "2025-01-24",
      },
      {
        type: "Final",
        status: "Scheduled",
        date: "2025-02-05",
      },
    ],
    documents: [
      {
        type: "Engineering Report",
        url: "https://www.pcbfl.gov/permits/9877-engineering.pdf",
      },
      {
        type: "Wave Study",
        url: "https://www.pcbfl.gov/permits/9877-waves.pdf",
      },
    ],
    last_updated: "2025-01-21T13:15:00Z",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source") || "all";
  const limit = parseInt(searchParams.get("limit") || "50");

  let filteredPermits = demoPermits;

  if (source !== "all") {
    filteredPermits = demoPermits.filter((permit) => permit.source === source);
  }

  // Sort by issue date (newest first) and limit results
  filteredPermits.sort(
    (a, b) =>
      new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime(),
  );
  const limitedPermits = filteredPermits.slice(0, limit);

  return NextResponse.json({
    success: true,
    count: limitedPermits.length,
    total_found: filteredPermits.length,
    permits: limitedPermits,
    last_updated: new Date().toISOString(),
    note: "This is demo data for testing the Market Intelligence dashboard",
  });
}

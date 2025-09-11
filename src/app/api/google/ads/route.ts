import { NextResponse } from "next/server";

// Mock Google Ads data - in production, integrate with Google Ads API
const mockAdsData = {
  campaignPerformance: {
    totalCampaigns: 12,
    activeCampaigns: 8,
    totalSpend: 15420.67,
    totalClicks: 3456,
    totalImpressions: 125890,
    averageCPC: 4.46,
    averageCTR: "2.74%",
    conversions: 89,
    conversionRate: "2.58%",
    costPerConversion: 173.49
  },
  topCampaigns: [
    {
      name: "Marine Construction Panama City",
      status: "ENABLED",
      spend: 4523.67,
      clicks: 1023,
      impressions: 45678,
      ctr: "2.24%",
      conversions: 34,
      costPerConversion: 133.05
    },
    {
      name: "Seawall Repair Services",
      status: "ENABLED",
      spend: 3890.45,
      clicks: 876,
      impressions: 34567,
      ctr: "2.53%",
      conversions: 28,
      costPerConversion: 138.94
    },
    {
      name: "Dock Construction FL",
      status: "ENABLED",
      spend: 3124.89,
      clicks: 734,
      impressions: 28901,
      ctr: "2.54%",
      conversions: 19,
      costPerConversion: 164.47
    }
  ],
  keywordPerformance: [
    { keyword: "marine construction panama city", spend: 1234.56, clicks: 234, conversions: 12 },
    { keyword: "seawall repair florida", spend: 987.34, clicks: 189, conversions: 9 },
    { keyword: "dock contractor", spend: 756.23, clicks: 156, conversions: 7 },
    { keyword: "marine contractor panama city beach", spend: 645.12, clicks: 134, conversions: 6 },
    { keyword: "retaining wall builder", spend: 534.78, clicks: 98, conversions: 4 }
  ],
  geographicPerformance: [
    { location: "Panama City, FL", spend: 5678.90, clicks: 1234, conversions: 45 },
    { location: "Panama City Beach, FL", spend: 3456.78, clicks: 987, conversions: 32 },
    { location: "Mexico Beach, FL", spend: 2345.67, clicks: 678, conversions: 21 },
    { location: "Destin, FL", spend: 1890.12, clicks: 456, conversions: 15 },
    { location: "Pensacola, FL", spend: 1234.56, clicks: 345, conversions: 11 }
  ],
  adPerformance: {
    bestPerformingAds: [
      {
        headline: "Expert Marine Construction Services",
        description: "Professional seawall & dock construction in Panama City. 20+ years experience.",
        clicks: 456,
        impressions: 12345,
        ctr: "3.7%"
      },
      {
        headline: "Seawall Repair Specialists",
        description: "Emergency seawall repairs. Licensed & insured marine contractors.",
        clicks: 389,
        impressions: 9876,
        ctr: "3.9%"
      }
    ]
  }
};

export async function GET() {
  try {
    // In production, this would:
    // 1. Get access token from stored credentials
    // 2. Call Google Ads API
    // 3. Process and return real PPC data

    return NextResponse.json({
      status: "ok",
      data: mockAdsData,
      lastUpdated: new Date().toISOString(),
      note: "Using mock data - integrate with Google Ads API for production"
    });

  } catch (error) {
    console.error('Google Ads API error:', error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch ads data"
    }, { status: 500 });
  }
}

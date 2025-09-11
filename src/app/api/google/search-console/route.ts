import { NextResponse } from "next/server";

// Mock Google Search Console data - in production, integrate with Search Console API
const mockSearchConsoleData = {
  searchPerformance: {
    totalClicks: 3456,
    totalImpressions: 125890,
    averageCTR: "2.74%",
    averagePosition: 12.3,
    topKeywords: [
      { keyword: "marine construction panama city", clicks: 234, impressions: 3456, ctr: "6.8%", position: 3.2 },
      { keyword: "seawall repair florida", clicks: 189, impressions: 4123, ctr: "4.6%", position: 4.1 },
      { keyword: "dock construction", clicks: 156, impressions: 3876, ctr: "4.0%", position: 5.8 },
      { keyword: "marine contractor panama city beach", clicks: 134, impressions: 2987, ctr: "4.5%", position: 2.9 },
      { keyword: "retaining wall construction", clicks: 98, impressions: 2345, ctr: "4.2%", position: 7.3 }
    ],
    topPages: [
      { page: "https://summitmarine.com/services", clicks: 456, impressions: 6789, ctr: "6.7%", position: 4.2 },
      { page: "https://summitmarine.com/", clicks: 389, impressions: 5678, ctr: "6.8%", position: 3.8 },
      { page: "https://summitmarine.com/projects", clicks: 234, impressions: 3456, ctr: "6.8%", position: 5.1 },
      { page: "https://summitmarine.com/contact", clicks: 198, impressions: 3123, ctr: "6.3%", position: 6.2 },
      { page: "https://summitmarine.com/about", clicks: 167, impressions: 2890, ctr: "5.8%", position: 7.4 }
    ]
  },
  indexingStatus: {
    totalPages: 145,
    indexedPages: 132,
    notIndexedPages: 13,
    issues: [
      { type: "Page with redirect", count: 5 },
      { type: "Crawled - currently not indexed", count: 3 },
      { type: "Discovered - currently not indexed", count: 5 }
    ]
  },
  mobileUsability: {
    mobileFriendlyPages: 138,
    notMobileFriendlyPages: 7,
    issues: [
      { issue: "Clickable elements too close together", count: 4 },
      { issue: "Content wider than screen", count: 2 },
      { issue: "Viewport not set", count: 1 }
    ]
  }
};

export async function GET() {
  try {
    // In production, this would:
    // 1. Get access token from stored credentials
    // 2. Call Google Search Console API
    // 3. Process and return real SEO data

    return NextResponse.json({
      status: "ok",
      data: mockSearchConsoleData,
      lastUpdated: new Date().toISOString(),
      note: "Using mock data - integrate with Google Search Console API for production"
    });

  } catch (error) {
    console.error('Google Search Console API error:', error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch search console data"
    }, { status: 500 });
  }
}

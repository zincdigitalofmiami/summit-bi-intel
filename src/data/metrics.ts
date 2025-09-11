import type { MetricData, GoogleAnalyticsData, FacebookAnalyticsData, GoogleBusinessAnalyticsData } from '@/types/types';

// Note: These are fallback values. Real data is fetched from /api/dashboard/metrics
export const fallbackMetrics = [
  {
    title: "Total Revenue",
    value: "$125,450",
    change: 0.125,
  },
  {
    title: "Active Projects",
    value: "8",
    change: 0.25,
  },
  {
    title: "New Leads",
    value: "23",
    change: 0.182,
  },
  {
    title: "Conversion Rate",
    value: "68%",
    change: -0.021,
  },
];

// Export fallback as default for backward compatibility
export const metrics = fallbackMetrics;

export const metricsData: MetricData[] = [
  {
    title: "Total Revenue",
    value: "$125,450",
    change: "+12.5%",
    trend: "up",
  },
  {
    title: "Active Projects",
    value: "8",
    change: "+2",
    trend: "up",
  },
  {
    title: "New Leads",
    value: "23",
    change: "+18.2%",
    trend: "up",
  },
  {
    title: "Conversion Rate",
    value: "68%",
    change: "-2.1%",
    trend: "down",
  },
];

export const googleAnalyticsData: GoogleAnalyticsData[] = [
  {
    id: 'ga-1',
    metricName: 'sessions',
    value: 1250,
    date: new Date('2024-09-01'),
    segment: 'organic',
    pagePath: '/',
    createdAt: new Date('2024-09-02'),
  },
  {
    id: 'ga-2',
    metricName: 'page_views',
    value: 3420,
    date: new Date('2024-09-01'),
    segment: 'all',
    pagePath: '/services',
    createdAt: new Date('2024-09-02'),
  },
  {
    id: 'ga-3',
    metricName: 'bounce_rate',
    value: 0.42,
    date: new Date('2024-09-01'),
    segment: 'all',
    createdAt: new Date('2024-09-02'),
  },
  {
    id: 'ga-4',
    metricName: 'conversion_rate',
    value: 0.068,
    date: new Date('2024-09-01'),
    segment: 'paid',
    createdAt: new Date('2024-09-02'),
  },
];

export const facebookAnalyticsData: FacebookAnalyticsData[] = [
  {
    id: 'fb-1',
    metricName: 'reach',
    value: 5240,
    date: new Date('2024-09-01'),
    campaign: 'Waterproofing Services Q3',
    reach: 5240,
    impressions: 12800,
    clicks: 187,
    adSpend: 450.00,
    createdAt: new Date('2024-09-02'),
  },
  {
    id: 'fb-2',
    metricName: 'engagement',
    value: 342,
    date: new Date('2024-09-01'),
    campaign: 'Emergency Repair Services',
    pageEngagements: 342,
    postReactions: 45,
    comments: 12,
    shares: 8,
    adSpend: 280.00,
    createdAt: new Date('2024-09-02'),
  },
];

export const googleBusinessData: GoogleBusinessAnalyticsData[] = [
  {
    id: 'gb-1',
    metricName: 'total_searches',
    value: 890,
    date: new Date('2024-09-01'),
    location: 'Miami Beach Office',
    totalSearches: 890,
    mapViews: 234,
    searchViews: 656,
    websiteClicks: 67,
    phoneCalls: 23,
    directionRequests: 45,
    photoViews: 156,
    createdAt: new Date('2024-09-02'),
  },
  {
    id: 'gb-2',
    metricName: 'customer_actions',
    value: 135,
    date: new Date('2024-09-01'),
    location: 'Fort Lauderdale Office',
    websiteClicks: 45,
    phoneCalls: 18,
    directionRequests: 32,
    createdAt: new Date('2024-09-02'),
  },
];

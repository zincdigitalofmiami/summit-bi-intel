import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Legacy types (keeping for backward compatibility)
export type TicketMetric = {
  date: string;
  type: "created" | "resolved";
  count: number;
};

// Core Business Entities
export interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
  createdAt: Date;
  photoUrl?: string;
  lastLogin?: Date;
}

export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
  createdAt: Date;
  contactPhone?: string;
  address?: string;
  notes?: string;
}

export interface Project {
  id: string;
  client?: Client;
  name: string;
  startDate: Date;
  expectedEndDate: Date;
  budget: number;
  status: string;
  createdAt: Date;
  description?: string;
  actualEndDate?: Date;
  actualCost?: number;
  projectManager?: User;
  sourceLead?: Lead;
}

export interface ProjectTask {
  id: string;
  project?: Project;
  name: string;
  assignedToUser?: User;
  startDate: Date;
  expectedEndDate: Date;
  status: string;
  description?: string;
  actualEndDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
}

export interface ProjectExpense {
  id: string;
  project?: Project;
  description: string;
  amount: number;
  dateIncurred: Date;
  category: string;
  invoiceNumber?: string;
  receiptUrl?: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  unit?: string;
  pricePerUnit?: number;
  costPerUnit?: number;
  createdAt: Date;
  serviceType?: string;
  materialType?: string;
  dimensionsRequired?: boolean;
  typicalDurationDays?: number;
  regulatoryRequirements?: string;
}

export interface Lead {
  id: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
  status: string;
  source: string;
  createdAt: Date;
  contactPhone?: string;
  companyName?: string;
  notes?: string;
  assignedToUser?: User;
  conversionDate?: Date;
  convertedToProject?: Project;
  estimatedFootage?: number;
  aiSuggestedNextStep?: string;
}

export interface LeadInterestedService {
  lead: Lead;
  service: Service;
}

// Intelligence & Analytics
export interface MarketIntelligence {
  id: string;
  title: string;
  source: string;
  datePublished: Date;
  category: string;
  summary: string;
  fullContentLink?: string;
  createdAt: Date;
}

export interface CompetitorIntelligence {
  id: string;
  competitorName: string;
  dateRecorded: Date;
  source: string;
  intelligenceType: string;
  details: string;
  createdAt: Date;
  pricingStrategy?: string;
  marketingChannels?: string[];
  productOfferings?: string[];
  marketShareEstimate?: number;
  strengths?: string[];
  weaknesses?: string[];
  recentMoves?: string;
  strategicRecommendations?: string;
}

export interface GoogleAnalyticsData {
  id: string;
  metricName: string;
  value: number;
  date: Date;
  segment?: string;
  pagePath?: string;
  createdAt: Date;
}

export interface GoogleBusinessAnalyticsData {
  id: string;
  metricName: string;
  value: number;
  date: Date;
  location?: string;
  createdAt: Date;
  totalSearches?: number;
  mapViews?: number;
  searchViews?: number;
  websiteClicks?: number;
  phoneCalls?: number;
  directionRequests?: number;
  photoViews?: number;
  customerActions?: string;
}

export interface FacebookAnalyticsData {
  id: string;
  metricName: string;
  value: number;
  date: Date;
  campaign?: string;
  createdAt: Date;
  reach?: number;
  impressions?: number;
  pageEngagements?: number;
  postReactions?: number;
  comments?: number;
  shares?: number;
  clicks?: number;
  videoViews?: number;
  adSpend?: number;
}

// Business Operations
export interface Proposal {
  id: string;
  project?: Project;
  client: Client;
  title: string;
  version: number;
  status: string;
  generatedAt: Date;
  sentAt?: Date;
  signedAt?: Date;
  signedBy?: string;
  templateUsed?: string;
  fileUrl: string;
  signatureLink?: string;
}

export interface ProposalServiceItem {
  proposal: Proposal;
  service: Service;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface Invoice {
  id: string;
  proposal?: Proposal;
  client: Client;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  totalAmount: number;
  status: string;
  paymentLink?: string;
  paidAt?: Date;
  createdAt: Date;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  description?: string;
  targetAudience?: string;
  startDate: Date;
  endDate: Date;
  status: string;
  automationTrigger?: string;
  templateUsed?: string;
  createdAt: Date;
}

export interface WeatherData {
  id: string;
  location: string;
  date: Date;
  temperature: number;
  conditions: string;
  windSpeed: number;
  humidity: number;
  forecastHours?: number;
  createdAt: Date;
  waveHeight?: number;
  waterTemperature?: number;
  tideConditions?: string;
  precipitationProbability?: number;
}

// AI Features
export interface AISuggestion {
  id: string;
  targetEntity: string;
  targetEntityId: string;
  suggestionType: string;
  content: string;
  generatedAt: Date;
  suggestedByUser?: User;
  relevanceScore?: number;
  actionTaken?: string;
}

export interface AIEmailTemplate {
  id: string;
  name: string;
  purpose: string;
  baseContent: string;
  generatedAt: Date;
  lastUsed?: Date;
}

export interface GeneratedEmail {
  id: string;
  lead?: Lead;
  client?: Client;
  user: User;
  templateUsed?: AIEmailTemplate;
  subject: string;
  body: string;
  generatedAt: Date;
  sentAt?: Date;
  recipientEmail: string;
  context?: string;
}

// Chart Data Types (keeping existing for backward compatibility)
export interface ChartData {
  id: string;
  value: number;
  category?: string;
  date?: string;
}

export interface MetricData {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ConversionData {
  stage: string;
  value: number;
  color: string;
}

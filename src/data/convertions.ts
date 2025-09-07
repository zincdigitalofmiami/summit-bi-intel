import type { ConversionData } from '@/types/types';

export const convertions = [
  {
    name: "Gulf Coast",
    value: 850000,
  },
  {
    name: "Emerald Coast", 
    value: 1250000,
  },
  {
    name: "Panhandle",
    value: 680000,
  },
  {
    name: "Inland Waterways",
    value: 420000,
  },
];

export const conversionsData: ConversionData[] = [
  {
    stage: "Leads Generated",
    value: 450,
    color: "#0ea5e9",
  },
  {
    stage: "Qualified Leads",
    value: 275,
    color: "#3b82f6",
  },
  {
    stage: "Proposals Sent",
    value: 180,
    color: "#6366f1",
  },
  {
    stage: "Projects Won",
    value: 122,
    color: "#8b5cf6",
  },
  {
    stage: "Completed Projects",
    value: 98,
    color: "#10b981",
  },
];

// Lead conversion pipeline data
export const leadConversionData = [
  { stage: "New Leads", count: 23, percentage: 100 },
  { stage: "Contacted", count: 18, percentage: 78 },
  { stage: "Qualified", count: 15, percentage: 65 },
  { stage: "Proposal Sent", count: 12, percentage: 52 },
  { stage: "Negotiation", count: 8, percentage: 35 },
  { stage: "Won", count: 5, percentage: 22 },
];

// Monthly conversion trends
export const monthlyConversions = [
  { month: "Jan", leads: 38, conversions: 12, rate: 31.6 },
  { month: "Feb", leads: 42, conversions: 15, rate: 35.7 },
  { month: "Mar", leads: 51, conversions: 18, rate: 35.3 },
  { month: "Apr", leads: 48, conversions: 16, rate: 33.3 },
  { month: "May", leads: 55, conversions: 22, rate: 40.0 },
  { month: "Jun", leads: 47, conversions: 19, rate: 40.4 },
  { month: "Jul", leads: 62, conversions: 25, rate: 40.3 },
  { month: "Aug", leads: 58, conversions: 28, rate: 48.3 },
];
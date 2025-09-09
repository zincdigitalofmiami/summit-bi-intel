import {
  Brain,
  Building2,
  Droplets,
  FileText,
  Gauge,
  type LucideIcon,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "Summit Marine Development - BI Dashboard",
  description:
    "Business Intelligence Dashboard for Marine Construction Services",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Target,
    name: "Leads",
    href: "/leads",
  },
  {
    icon: Building2,
    name: "Projects",
    href: "/projects",
  },
  {
    icon: Users,
    name: "Clients",
    href: "/clients",
  },
  {
    icon: Phone,
    name: "Contacts",
    href: "/contacts",
  },
  {
    icon: FileText,
    name: "Proposals",
    href: "/proposals",
  },
  {
    icon: TrendingUp,
    name: "Analytics",
    href: "/analytics",
  },
  {
    icon: Gauge,
    name: "Performance",
    href: "/performance",
  },
  {
    icon: Brain,
    name: "Market Intelligence",
    href: "/analytics/market-intelligence",
  },
  {
    icon: Mail,
    name: "AI Assistant",
    href: "/ai",
  },
  {
    icon: Droplets,
    name: "Services",
    href: "/services",
  },
];

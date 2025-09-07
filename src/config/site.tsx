import { 
  Gauge, 
  type LucideIcon, 
  Users, 
  Building2, 
  FileText, 
  Target,
  TrendingUp,
  Mail,
  Droplets,
  Phone
} from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "Summit Marine Development - BI Dashboard",
  description: "Business Intelligence Dashboard for Marine Construction Services",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Dashboard",
    href: "/",
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

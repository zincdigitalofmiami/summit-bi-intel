"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2,
  TrendingUp,
  TrendingDown,
  Star,
  MapPin,
  Phone,
  AlertTriangle,
  Target,
  Eye,
  Calendar
} from "lucide-react";

const competitors = [
  {
    id: "bay-county-marine",
    name: "Bay County Marine Construction",
    location: "Panama City, FL",
    services: ["Seawalls", "Dock Repair", "Marine Construction"],
    marketShare: 35,
    trend: "declining",
    lastUpdate: "September 2025",
    strengths: ["Established reputation", "Large equipment fleet"],
    weaknesses: ["Outdated methods", "High pricing", "Long lead times"],
    recentProjects: ["Panama City Marina Repair", "Shell Island Seawall"],
    phone: "(850) 555-0123",
    competitiveRating: 7,
    opportunities: ["Technology gap", "Pricing advantage", "Speed advantage"],
    threats: ["Established relationships", "Financial backing"]
  },
  {
    id: "emerald-coast-marine",
    name: "Emerald Coast Marine Services",
    location: "Destin, FL (expanding to PC)",
    services: ["Dock Construction", "Pier Repair", "Waterfront Development"],
    marketShare: 20,
    trend: "growing",
    lastUpdate: "August 2025",
    strengths: ["Modern equipment", "Competitive pricing"],
    weaknesses: ["New to Panama City", "Limited local relationships"],
    recentProjects: ["Crab Island Dock", "Henderson Beach Pier"],
    phone: "(850) 555-0456",
    competitiveRating: 8,
    opportunities: ["Local expertise", "Established network"],
    threats: ["Growing presence", "Aggressive pricing"]
  },
  {
    id: "gulf-shore-construction",
    name: "Gulf Shore Construction LLC",
    location: "Panama City Beach, FL",
    services: ["Residential Docks", "Seawall Repair", "Marine Restoration"],
    marketShare: 15,
    trend: "stable",
    lastUpdate: "July 2025",
    strengths: ["Local knowledge", "Residential focus"],
    weaknesses: ["Limited commercial capability", "Small team"],
    recentProjects: ["Grand Lagoon Docks", "St. Andrews Seawall"],
    phone: "(850) 555-0789",
    competitiveRating: 6,
    opportunities: ["Commercial expansion", "Technology adoption"],
    threats: ["Niche expertise", "Cost efficiency"]
  }
];

const industryTrends = [
  {
    id: "snapjacket-technology",
    title: "SnapJacket Dock Piling Repair",
    category: "Innovation",
    impact: "High",
    timeframe: "6-12 months",
    description: "Revolutionary piling repair system reducing installation time by 60%",
    opportunity: "First-mover advantage in Panama City market",
    actionRequired: "Immediate evaluation and training",
    competitorAdoption: "None detected in local market",
    marketPotential: "$2.5M annually in Panama City area"
  },
  {
    id: "eco-friendly-materials",
    title: "Eco-Friendly Marine Concrete",
    category: "Sustainability",
    impact: "Medium",
    timeframe: "12-18 months",
    description: "New concrete formulations reduce environmental impact",
    opportunity: "Faster permitting and environmental approvals",
    actionRequired: "Supplier relationships and certification",
    competitorAdoption: "Bay County Marine investigating",
    marketPotential: "20% faster project completion"
  },
  {
    id: "iot-monitoring",
    title: "Smart Infrastructure Monitoring",
    category: "Technology",
    impact: "Medium",
    timeframe: "18-24 months",
    description: "IoT sensors for real-time structural health monitoring",
    opportunity: "Premium service offerings and maintenance contracts",
    actionRequired: "Technology partnerships",
    competitorAdoption: "No local adoption yet",
    marketPotential: "Recurring revenue opportunity"
  }
];

export default function CompetitorIntelligence() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "growing":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "growing":
        return "text-green-600 dark:text-green-400";
      case "declining":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Panama City Marine Construction Competitors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {competitors.map((competitor) => (
              <div key={competitor.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">{competitor.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {competitor.location}
                      <Phone className="h-3 w-3 ml-2" />
                      {competitor.phone}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getTrendIcon(competitor.trend)}
                      <span className={getTrendColor(competitor.trend)}>
                        {competitor.marketShare}% market share
                      </span>
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{competitor.competitiveRating}/10</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-1">Strengths</h5>
                    <ul className="space-y-1">
                      {competitor.strengths.map((strength, index) => (
                        <li key={index} className="text-muted-foreground">• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 dark:text-red-300 mb-1">Weaknesses</h5>
                    <ul className="space-y-1">
                      {competitor.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-muted-foreground">• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Our Opportunities</h5>
                    <ul className="space-y-1">
                      {competitor.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-muted-foreground">• {opportunity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-1">Threats</h5>
                    <ul className="space-y-1">
                      {competitor.threats.map((threat, index) => (
                        <li key={index} className="text-muted-foreground">• {threat}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <h5 className="font-medium mb-1">Recent Projects</h5>
                  <div className="flex flex-wrap gap-2">
                    {competitor.recentProjects.map((project, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Building2 className="h-3 w-3 mr-1" />
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Marine Construction Industry Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industryTrends.map((trend) => (
              <div key={trend.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{trend.title}</h4>
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getImpactColor(trend.impact)}>
                      {trend.impact} Impact
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {trend.timeframe}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Opportunity</h5>
                    <p className="text-muted-foreground">{trend.opportunity}</p>
                    <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-1 mt-2">Market Potential</h5>
                    <p className="text-muted-foreground">{trend.marketPotential}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-1">Action Required</h5>
                    <p className="text-muted-foreground">{trend.actionRequired}</p>
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1 mt-2">Competitor Status</h5>
                    <p className="text-muted-foreground">{trend.competitorAdoption}</p>
                  </div>
                </div>

                {trend.id === "snapjacket-technology" && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Strategic Priority</span>
                    </div>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                      First company to adopt SnapJacket in Panama City could capture significant market share. 
                      Recommend immediate evaluation and training program.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  Waves,
  Anchor,
  Truck,
  Settings
} from "lucide-react";

const projects = [
  {
    id: "marina-deck-001",
    name: "Marina Deck Construction",
    client: "Oceanfront Resort Group",
    location: "Biscayne Bay, Miami",
    status: "active",
    progress: 75,
    budget: 850000,
    spent: 637500,
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    crew: ["Team Alpha (5)", "Marine Specialist (2)"],
    equipment: ["Floating Crane", "Work Barge", "Dive Equipment"],
    weatherImpact: "Low Risk",
    nextMilestone: "Pier Installation",
    priority: "high"
  },
  {
    id: "seawall-repair-002",
    name: "Seawall Reinforcement",
    client: "Coral Gables Marina",
    location: "Coral Gables Waterway",
    status: "planning",
    progress: 15,
    budget: 425000,
    spent: 63750,
    startDate: "2025-10-01",
    endDate: "2026-01-15",
    crew: ["Team Beta (4)"],
    equipment: ["Concrete Pumper", "Marine Excavator"],
    weatherImpact: "Medium Risk",
    nextMilestone: "Permits & Approvals",
    priority: "medium"
  },
  {
    id: "pier-foundation-003",
    name: "Pier Foundation Repair",
    client: "Key Largo Resort",
    location: "Key Largo, FL",
    status: "pending",
    progress: 5,
    budget: 320000,
    spent: 16000,
    startDate: "2025-12-01",
    endDate: "2026-02-28",
    crew: ["Team Gamma (3)", "Diving Team (2)"],
    equipment: ["Pile Driver", "Work Platform"],
    weatherImpact: "High Risk",
    nextMilestone: "Site Survey",
    priority: "high"
  },
  {
    id: "marina-expansion-004",
    name: "Marina Slip Expansion",
    client: "Bayfront Commercial Center",
    location: "Downtown Miami",
    status: "completed",
    progress: 100,
    budget: 1200000,
    spent: 1150000,
    startDate: "2025-03-15",
    endDate: "2025-08-30",
    crew: ["Team Alpha (6)", "Team Beta (4)"],
    equipment: ["Mobile Crane", "Multiple Barges"],
    weatherImpact: "Completed",
    nextMilestone: "Final Inspection",
    priority: "completed"
  }
];

export default function ProjectManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Settings className="h-4 w-4 animate-spin" />;
      case "planning":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getWeatherRiskColor = (risk: string) => {
    switch (risk) {
      case "High Risk":
        return "text-red-600 dark:text-red-400";
      case "Medium Risk":
        return "text-yellow-600 dark:text-yellow-400";
      case "Low Risk":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Marine Projects</h2>
          <p className="text-muted-foreground">
            Manage and track all marine construction projects
          </p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status}</span>
                  </Badge>
                  {project.priority !== "completed" && (
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority} priority
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`rounded-full h-2 transition-all duration-300 ${
                      project.status === "completed" ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location</span>
                  </div>
                  <p className="font-medium leading-tight">{project.location}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Budget</span>
                  </div>
                  <div>
                    <p className="font-medium">{formatCurrency(project.budget)}</p>
                    <p className="text-xs text-muted-foreground">
                      Spent: {formatCurrency(project.spent)} ({Math.round((project.spent / project.budget) * 100)}%)
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Timeline</span>
                  </div>
                  <div>
                    <p className="font-medium">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Weather Risk</span>
                  </div>
                  <p className={`font-medium ${getWeatherRiskColor(project.weatherImpact)}`}>
                    {project.weatherImpact}
                  </p>
                </div>
              </div>

              {/* Crew and Equipment */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Crew</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.crew.map((member, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Anchor className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Equipment</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Truck className="h-3 w-3 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Milestone */}
              {project.status !== "completed" && (
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Next Milestone</p>
                      <p className="font-medium">{project.nextMilestone}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.status === "active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {projects.filter(p => p.status === "planning").length}
            </div>
            <div className="text-sm text-muted-foreground">In Planning</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {projects.filter(p => p.status === "pending").length}
            </div>
            <div className="text-sm text-muted-foreground">Pending Start</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {projects.filter(p => p.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

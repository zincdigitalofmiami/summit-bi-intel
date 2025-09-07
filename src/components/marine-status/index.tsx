"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  Anchor, 
  Waves,
  Thermometer,
  Wind
} from "lucide-react";

const statusData = {
  activeProjects: [
    {
      id: "marina-deck",
      name: "Marina Deck Construction",
      location: "Biscayne Bay",
      status: "In Progress",
      completion: 75,
      crew: "Team Alpha",
      dueDate: "Dec 15, 2025"
    },
    {
      id: "pier-repair",
      name: "Pier Foundation Repair",
      location: "Key Largo",
      status: "Starting Soon",
      completion: 0,
      crew: "Team Beta",
      dueDate: "Dec 20, 2025"
    },
    {
      id: "seawall",
      name: "Seawall Installation",
      location: "Miami Beach",
      status: "Planning",
      completion: 10,
      crew: "Team Gamma",
      dueDate: "Jan 5, 2026"
    }
  ],
  marineConditions: {
    tideHeight: "2.3 ft",
    tideStatus: "Rising",
    waveHeight: "1-2 ft",
    windSpeed: "12 mph NE",
    visibility: "10+ miles",
    temperature: "78°F"
  },
  fleetStatus: {
    available: 4,
    inUse: 2,
    maintenance: 1,
    totalVessels: 7
  }
};

import WeatherWidget from "@/components/weather-widget";

export default function MarineStatusOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Starting Soon":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <CheckCircle className="h-4 w-4" />;
      case "Starting Soon":
        return <Clock className="h-4 w-4" />;
      case "Planning":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5" />
            Active Marine Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusData.activeProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1">{project.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.crew}
                    </span>
                    <span>Due: {project.dueDate}</span>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <div className="text-2xl font-bold">{project.completion}%</div>
                  <div className="w-full sm:w-24 bg-muted rounded-full h-2 mt-1">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{ width: `${project.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marine Conditions & Fleet Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-5 w-5" />
              Marine Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tide</span>
                  <span className="font-medium">{statusData.marineConditions.tideHeight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Wave Height</span>
                  <span className="font-medium">{statusData.marineConditions.waveHeight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Visibility</span>
                  <span className="font-medium">{statusData.marineConditions.visibility}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Wind className="h-3 w-3" />
                    Wind
                  </span>
                  <span className="font-medium">{statusData.marineConditions.windSpeed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    Temp
                  </span>
                  <span className="font-medium">{statusData.marineConditions.temperature}</span>
                </div>
                <div className="text-center mt-3">
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Good Conditions
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Anchor className="h-5 w-5" />
              Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {statusData.fleetStatus.available}
                </div>
                <div className="text-sm text-muted-foreground">Available Vessels</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-semibold">{statusData.fleetStatus.inUse}</div>
                  <div className="text-xs text-muted-foreground">In Use</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{statusData.fleetStatus.maintenance}</div>
                  <div className="text-xs text-muted-foreground">Maintenance</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{statusData.fleetStatus.totalVessels}</div>
                  <div className="text-xs text-muted-foreground">Total Fleet</div>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Fleet Utilization</span>
                  <span>{Math.round((statusData.fleetStatus.inUse / statusData.fleetStatus.totalVessels) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ 
                      width: `${(statusData.fleetStatus.inUse / statusData.fleetStatus.totalVessels) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Information */}
      <WeatherWidget />
    </div>
  );
}

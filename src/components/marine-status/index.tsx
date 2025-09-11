"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  AlertTriangle,
  Users,
  Anchor,
  Waves,
  Thermometer,
  Wind,
} from "lucide-react";

// Dynamic marine status data (static for now; live weather removed)
const useMarineStatusData = () => {
  const [marineConditions, setMarineConditions] = useState({
    tideHeight: "2.3 ft",
    tideStatus: "Rising",
    waveHeight: "1-2 ft",
    windSpeed: "12 mph NE",
    visibility: "10+ miles",
    temperature: "78°F",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Live weather disabled. Keep defaults and mark as loaded.
    setMarineConditions((prev) => ({ ...prev }));
    setIsLoading(false);
  }, []);

  return { marineConditions, isLoading };
};

const activeProjects = [
  {
    id: "marina-deck",
    name: "Marina Deck Construction",
    location: "Biscayne Bay",
    status: "In Progress",
    completion: 75,
    crew: "Team Alpha",
    dueDate: "Dec 15, 2025",
  },
  {
    id: "pier-repair",
    name: "Pier Foundation Repair",
    location: "Key Largo",
    status: "Starting Soon",
    completion: 0,
    crew: "Team Beta",
    dueDate: "Dec 20, 2025",
  },
  {
    id: "seawall",
    name: "Seawall Installation",
    location: "Miami Beach",
    status: "Planning",
    completion: 10,
    crew: "Team Gamma",
    dueDate: "Jan 5, 2026",
  },
];

const equipmentStatus = {
  available: 4,
  inUse: 2,
  maintenance: 1,
  totalEquipment: 7,
};

export default function MarineStatusOverview() {
  const { marineConditions, isLoading } = useMarineStatusData();

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
      {/* Today's Tasks & Active Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5" />
            Today's Tasks & Active Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Today's Urgent Tasks */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Today's Priority Tasks
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Biscayne Bay Deck Inspection</p>
                  <p className="text-xs text-muted-foreground">Team Alpha • Due: 8:00 AM</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">High Priority</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Miracle Strip Proposal Review</p>
                  <p className="text-xs text-muted-foreground">Client meeting • 2:00 PM</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Meeting</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Equipment Maintenance Check</p>
                  <p className="text-xs text-muted-foreground">Preventive maintenance • 4:00 PM</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Maintenance</Badge>
              </div>
            </div>
          </div>

          {/* Active Projects */}
          <div>
            <h4 className="font-medium mb-3">Active Projects</h4>
            <div className="space-y-4">
              {activeProjects.map((project) => (
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
          </div>
        </CardContent>
      </Card>

      {/* Marine Conditions & Equipment Status */}
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
                  <span className="font-medium">{marineConditions.tideHeight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Wave Height</span>
                  <span className="font-medium">{marineConditions.waveHeight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Visibility</span>
                  <span className="font-medium">{marineConditions.visibility}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Wind className="h-3 w-3" />
                    Wind
                  </span>
                  <span className="font-medium">{marineConditions.windSpeed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    Temp
                  </span>
                  <span className="font-medium">{marineConditions.temperature}</span>
                </div>
                <div className="text-center mt-3">
                  <Badge
                    variant="outline"
                    className={
                      isLoading
                        ? "bg-gray-50 text-gray-500"
                        : "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                    }
                  >
                    {isLoading ? "Loading..." : "Live Conditions"}
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
              Equipment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {equipmentStatus.available}
                </div>
                <div className="text-sm text-muted-foreground">Available Equipment</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-semibold">{equipmentStatus.inUse}</div>
                  <div className="text-xs text-muted-foreground">In Use</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{equipmentStatus.maintenance}</div>
                  <div className="text-xs text-muted-foreground">Maintenance</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{equipmentStatus.totalEquipment}</div>
                  <div className="text-xs text-muted-foreground">Total Equipment</div>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Equipment Utilization</span>
                  <span>
                    {Math.round(
                      (equipmentStatus.inUse / equipmentStatus.totalEquipment) * 100,
                    )}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{
                      width: `${(equipmentStatus.inUse / equipmentStatus.totalEquipment) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

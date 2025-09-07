"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Map,
  Navigation,
  Anchor,
  Waves,
  AlertTriangle,
  ExternalLink
} from "lucide-react";

interface MarineZone {
  name: string;
  status: 'good' | 'caution' | 'warning';
  waveHeight: string;
  windSpeed: string;
  visibility: string;
  alerts: string[];
}

const marineZones: MarineZone[] = [
  {
    name: "Panama City Bay",
    status: 'good',
    waveHeight: "1-2 ft",
    windSpeed: "8-12 mph",
    visibility: "10+ miles",
    alerts: []
  },
  {
    name: "St. Andrews Bay",
    status: 'caution',
    waveHeight: "2-3 ft",
    windSpeed: "12-15 mph",
    visibility: "8-10 miles",
    alerts: ["Small craft advisory"]
  },
  {
    name: "Choctawhatchee Bay",
    status: 'warning',
    waveHeight: "3-4 ft",
    windSpeed: "15-20 mph",
    visibility: "5-8 miles",
    alerts: ["High surf warning", "Strong currents"]
  }
];

export default function WeatherMapWidget() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'caution':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'warning':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <Anchor className="h-4 w-4" />;
      case 'caution':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <Waves className="h-4 w-4" />;
      default:
        return <Map className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Marine Weather Map
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            Full Map
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Map Placeholder */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                  Gulf Coast Marine Zones
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  Interactive weather map
                </p>
              </div>
            </div>

            {/* Zone markers */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 right-6 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          {/* Marine Zones Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Zone Conditions
            </h4>

            {marineZones.map((zone, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{zone.name}</span>
                  <Badge className={getStatusColor(zone.status)}>
                    {getStatusIcon(zone.status)}
                    <span className="ml-1 capitalize">{zone.status}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Waves:</span>
                    <span className="ml-1 font-medium">{zone.waveHeight}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Wind:</span>
                    <span className="ml-1 font-medium">{zone.windSpeed}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Vis:</span>
                    <span className="ml-1 font-medium">{zone.visibility}</span>
                  </div>
                </div>

                {zone.alerts.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {zone.alerts.map((alert, alertIndex) => (
                      <Badge key={alertIndex} variant="destructive" className="text-xs">
                        {alert}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Caution</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Warning</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

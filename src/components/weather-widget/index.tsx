"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Eye,
  Waves,
  AlertTriangle
} from "lucide-react";

const currentWeather = {
  location: "Miami, FL",
  temperature: 78,
  condition: "Partly Cloudy",
  humidity: 68,
  windSpeed: 12,
  windDirection: "NE",
  visibility: 10,
  uvIndex: 7,
  waveHeight: "1-2",
  tideStatus: "Rising",
  marineCondition: "Good"
};

const forecast = [
  {
    day: "Today",
    high: 82,
    low: 75,
    condition: "sunny",
    marineRisk: "low",
    workability: "excellent"
  },
  {
    day: "Tomorrow",
    high: 79,
    low: 73,
    condition: "cloudy",
    marineRisk: "low", 
    workability: "good"
  },
  {
    day: "Friday",
    high: 85,
    low: 77,
    condition: "sunny",
    marineRisk: "low",
    workability: "excellent"
  },
  {
    day: "Saturday",
    high: 76,
    low: 70,
    condition: "rainy",
    marineRisk: "high",
    workability: "poor"
  }
];

export default function WeatherWidget() {
  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getWorkabilityColor = (workability: string) => {
    switch (workability) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "fair":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "poor":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "high":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Conditions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Waves className="h-5 w-5" />
            Marine Weather - {currentWeather.location}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Main Temperature Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="text-3xl font-bold">{currentWeather.temperature}°F</div>
                  <div className="text-sm text-muted-foreground">{currentWeather.condition}</div>
                </div>
              </div>
              <Badge className={
                currentWeather.marineCondition === "Good" 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }>
                {currentWeather.marineCondition} Conditions
              </Badge>
            </div>

            {/* Detailed Conditions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{currentWeather.windSpeed} mph</div>
                  <div className="text-muted-foreground">{currentWeather.windDirection}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{currentWeather.waveHeight} ft</div>
                  <div className="text-muted-foreground">Wave Height</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{currentWeather.visibility}+ mi</div>
                  <div className="text-muted-foreground">Visibility</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{currentWeather.humidity}%</div>
                  <div className="text-muted-foreground">Humidity</div>
                </div>
              </div>
            </div>

            {/* Tide Information */}
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Tide Status</span>
              </div>
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                {currentWeather.tideStatus}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4-Day Forecast */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Marine Work Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-3 rounded-lg border bg-muted/20">
                <div className="font-medium text-sm mb-2">{day.day}</div>
                <div className="flex justify-center mb-2">
                  {getConditionIcon(day.condition)}
                </div>
                <div className="text-sm space-y-1">
                  <div className="font-medium">{day.high}°/{day.low}°</div>
                  <Badge 
                    variant="outline" 
                    className={`${getWorkabilityColor(day.workability)} text-xs`}
                  >
                    {day.workability}
                  </Badge>
                  <div className={`text-xs ${getRiskColor(day.marineRisk)}`}>
                    {day.marineRisk} risk
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Weather Alert */}
          {forecast.some(day => day.marineRisk === "high") && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Marine Weather Alert</span>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Poor marine conditions expected Saturday. Consider rescheduling offshore work.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

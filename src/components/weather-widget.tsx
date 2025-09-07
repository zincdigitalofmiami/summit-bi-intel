"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  Eye,
  Gauge
} from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: string;
  pressure: number;
  uvIndex: number;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

const mockWeatherData: WeatherData = {
  temperature: 78,
  condition: "Partly Cloudy",
  humidity: 72,
  windSpeed: 12,
  windDirection: "NE",
  visibility: "10+ miles",
  pressure: 30.15,
  uvIndex: 6,
  forecast: [
    { day: "Today", high: 82, low: 68, condition: "Partly Cloudy" },
    { day: "Tomorrow", high: 85, low: 70, condition: "Sunny" },
    { day: "Wednesday", high: 83, low: 69, condition: "Light Rain" },
    { day: "Thursday", high: 81, low: 67, condition: "Sunny" },
    { day: "Friday", high: 79, low: 65, condition: "Cloudy" }
  ]
};

export default function WeatherWidget() {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'partly cloudy':
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'light rain':
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-400" />;
    }
  };

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return "text-green-600";
    if (uvIndex <= 5) return "text-yellow-600";
    if (uvIndex <= 7) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Marine Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Conditions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getWeatherIcon(mockWeatherData.condition)}
              <div>
                <div className="text-3xl font-bold">{mockWeatherData.temperature}°F</div>
                <div className="text-sm text-muted-foreground">{mockWeatherData.condition}</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Panama City, FL
            </Badge>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{mockWeatherData.humidity}%</div>
                <div className="text-xs text-muted-foreground">Humidity</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{mockWeatherData.windSpeed} mph</div>
                <div className="text-xs text-muted-foreground">{mockWeatherData.windDirection}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{mockWeatherData.visibility}</div>
                <div className="text-xs text-muted-foreground">Visibility</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{mockWeatherData.pressure}&quot;</div>
                <div className="text-xs text-muted-foreground">Pressure</div>
              </div>
            </div>
          </div>

          {/* UV Index */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <span className="text-sm">UV Index</span>
            </div>
            <span className={`text-sm font-medium ${getUVColor(mockWeatherData.uvIndex)}`}>
              {mockWeatherData.uvIndex} (Moderate)
            </span>
          </div>

          {/* 5-Day Forecast */}
          <div>
            <h4 className="text-sm font-medium mb-3">5-Day Forecast</h4>
            <div className="space-y-2">
              {mockWeatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(day.condition)}
                    <span className="text-sm font-medium w-16">{day.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{day.low}°</span>
                    <span className="text-sm font-medium">{day.high}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

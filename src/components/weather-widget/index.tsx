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
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useState, useEffect } from "react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  uvIndex: number;
  waveHeight: string;
  tideStatus: string;
  tideHeight: number;
  marineCondition: string;
  alerts: string[];
  dewPoint: number;
  barometricPressure: number;
  lastUpdated: string;
  source: string;
}

interface ForecastDay {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  conditionText: string;
  windSpeed: number;
  windDirection: string;
  waveHeight: string;
  marineRisk: 'low' | 'medium' | 'high';
  workability: 'excellent' | 'good' | 'fair' | 'poor';
  chanceOfRain: number;
}

const fallbackWeather: WeatherData = {
  location: "Panama City, FL",
  temperature: 78,
  condition: "Clear",
  humidity: 68,
  windSpeed: 12,
  windDirection: "NE",
  visibility: 10,
  uvIndex: 7,
  waveHeight: "1-2",
  tideStatus: "Rising",
  tideHeight: 2.3,
  marineCondition: "Good",
  alerts: [],
  dewPoint: 72,
  barometricPressure: 30.15,
  lastUpdated: new Date().toISOString(),
  source: "Fallback Data"
};

const fallbackForecast: ForecastDay[] = [
  {
    day: "Today",
    date: new Date().toLocaleDateString(),
    high: 82,
    low: 75,
    condition: "sunny",
    conditionText: "Sunny",
    windSpeed: 12,
    windDirection: "NE",
    waveHeight: "1-2",
    marineRisk: "low",
    workability: "excellent",
    chanceOfRain: 10
  },
  {
    day: "Tomorrow",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
    high: 79,
    low: 73,
    condition: "cloudy",
    conditionText: "Partly Cloudy",
    windSpeed: 15,
    windDirection: "E",
    waveHeight: "2-3",
    marineRisk: "medium",
    workability: "good",
    chanceOfRain: 20
  },
  {
    day: "Friday",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    high: 85,
    low: 77,
    condition: "sunny",
    conditionText: "Sunny",
    windSpeed: 10,
    windDirection: "N",
    waveHeight: "1-2",
    marineRisk: "low",
    workability: "excellent",
    chanceOfRain: 5
  },
  {
    day: "Saturday",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    high: 76,
    low: 70,
    condition: "rainy",
    conditionText: "Showers",
    windSpeed: 20,
    windDirection: "S",
    waveHeight: "3-4",
    marineRisk: "high",
    workability: "poor",
    chanceOfRain: 80
  }
];

export default function WeatherWidget() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>(fallbackWeather);
  const [forecast, setForecast] = useState<ForecastDay[]>(fallbackForecast);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch current weather and forecast in parallel
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch('/api/weather/current'),
        fetch('/api/weather/forecast')
      ]);

      if (currentResponse.ok) {
        const currentData = await currentResponse.json();
        setCurrentWeather(currentData);
      }

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        setForecast(forecastData.forecast);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

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
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Waves className="h-5 w-5" />
              Marine Weather - {currentWeather.location}
            </CardTitle>
            <div className="flex items-center gap-2">
              {error && (
                <Badge variant="outline" className="text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Error
                </Badge>
              )}
              <button
                onClick={fetchWeatherData}
                disabled={isLoading}
                className="p-1 hover:bg-muted rounded disabled:opacity-50"
                title="Refresh weather data"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              {error}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date(currentWeather.lastUpdated).toLocaleTimeString()}
            {currentWeather.source && ` • ${currentWeather.source}`}
          </p>
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

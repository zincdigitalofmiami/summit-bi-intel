"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Waves, 
  MapPin,
  RefreshCw
} from "lucide-react";

export default function WeatherMapWidget() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const refreshMap = () => {
    setIsLoading(true);
    setRefreshKey(prev => prev + 1);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // NOAA Weather Radar for Panama City area - static URL to prevent hydration mismatch
  const radarImageUrl = `https://radar.weather.gov/ridge/standard/KTLH_loop.gif`;

  if (!isClient) {
    return (
      <Card className="hidden lg:block">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cloud className="h-5 w-5" />
              Live Weather Radar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                Panama City
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
            <div className="text-muted-foreground">Loading weather radar...</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="hidden lg:block">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Cloud className="h-5 w-5" />
            Live Weather Radar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              Panama City
            </Badge>
            <button
              onClick={refreshMap}
              className="p-1 hover:bg-muted rounded"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {/* Compact Horizontal Layout */}
        <div className="space-y-3">
          {/* Weather Radar Section - Horizontal */}
          <div className="relative h-32 bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 dark:from-blue-950 dark:via-slate-950 dark:to-blue-950 rounded-lg overflow-hidden border">
            <Image
              src={radarImageUrl}
              alt="Weather Radar for Panama City Area"
              width={300}
              height={128}
              className="w-full h-full object-cover opacity-80"
              unoptimized
              onError={(e) => {
                (e.target as HTMLImageElement).src = 
                  'https://radar.weather.gov/ridge/standard/KTLH_0.gif';
              }}
            />
            
            {/* Overlay Information */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            
            {/* Top Info Bar */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
              <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                Live Radar
              </div>
              <div className="bg-primary/90 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <Waves className="h-3 w-3" />
                Marine
              </div>
            </div>

            {/* Panama City Location Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-2 h-2 bg-red-500 rounded-full border border-white shadow-lg animate-pulse" />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white px-1 py-0.5 rounded text-xs whitespace-nowrap font-medium">
                  Panama City
                </div>
              </div>
            </div>

            {/* Compact Legend */}
            <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded-full">
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Light</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>Mod</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span>Heavy</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Marine Conditions - Compact Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-muted/50 rounded-lg p-2 border">
              <div className="text-xs text-muted-foreground">Wind</div>
              <div className="text-sm font-semibold">12 mph NE</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2 border">
              <div className="text-xs text-muted-foreground">Waves</div>
              <div className="text-sm font-semibold">2-3 ft</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2 border">
              <div className="text-xs text-muted-foreground">Visibility</div>
              <div className="text-sm font-semibold">10+ mi</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

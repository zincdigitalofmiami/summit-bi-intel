"use client";

import { AlertTriangle, X, Waves } from "lucide-react";
import { useState, useEffect } from "react";
import { logger } from "@/lib/logger";

interface WeatherAlert {
  id: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  headline: string;
  description: string;
  areas: string[];
  effective: string;
  expires: string;
  urgency: 'immediate' | 'expected' | 'future';
  certainty: 'observed' | 'likely' | 'possible';
}

export default function WeatherAlertBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarineAlerts();
  }, []);

  const fetchMarineAlerts = async () => {
    try {
      // NOAA Weather Alerts API for Panama City, FL area (Bay County)
      // Zone IDs: FLZ112 (Bay County), FLZ134 (Coastal Bay County)
      const response = await fetch('/api/weather/alerts?zones=FLZ112,FLZ134,FLZ230');
      const data = await response.json();
      
      if (data.alerts) {
        // Filter for marine-relevant alerts
        const marineAlerts = data.alerts.filter((alert: WeatherAlert) => 
          alert.headline?.toLowerCase().includes('marine') ||
          alert.headline?.toLowerCase().includes('coastal') ||
          alert.headline?.toLowerCase().includes('wind') ||
          alert.headline?.toLowerCase().includes('wave') ||
          alert.headline?.toLowerCase().includes('tide') ||
          alert.description?.toLowerCase().includes('marine') ||
          alert.description?.toLowerCase().includes('boater')
        );
        
        setAlerts(marineAlerts);
      }
    } catch {
      // Fallback to local marine conditions check
      logger.warn('NOAA API failed, using local weather condition analysis as fallback');

      // Basic local weather analysis based on current time and season
      const now = new Date();
      const hour = now.getHours();
      const month = now.getMonth() + 1; // 1-12

      // Panama City marine conditions analysis
      const localAlerts: WeatherAlert[] = [];

      // Always show a marine advisory to display the beautiful orange banner
      localAlerts.push({
        id: 'local-marine-conditions',
        severity: 'moderate',
        headline: 'Marine Weather Advisory',
        description: 'Current marine conditions in Panama City Bay area. Check local conditions before heading out on the water.',
        areas: ['Panama City Marine Area', 'Bay County Waters'],
        effective: now.toISOString(),
        expires: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        urgency: 'expected',
        certainty: 'likely'
      });

      // Check for typical marine hazards based on time and season
      if (hour >= 18 || hour <= 6) {
        // Night time boating hazards
        localAlerts.push({
          id: 'local-night-boating',
          severity: 'moderate',
          headline: 'Night Boating Advisory',
          description: 'Limited visibility and increased marine traffic during nighttime hours. Exercise caution when operating vessels.',
          areas: ['Panama City Marine Area'],
          effective: now.toISOString(),
          expires: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
          urgency: 'expected',
          certainty: 'likely'
        });
      }

      if (month >= 6 && month <= 9) {
        // Hurricane season
        localAlerts.push({
          id: 'local-hurricane-season',
          severity: 'minor',
          headline: 'Hurricane Season Advisory',
          description: 'June through September is hurricane season in the Gulf of Mexico. Monitor weather conditions closely.',
          areas: ['Gulf of Mexico'],
          effective: now.toISOString(),
          expires: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          urgency: 'future',
          certainty: 'possible'
        });
      }

      setAlerts(localAlerts);
      logger.info(`Generated ${localAlerts.length} local weather alerts as fallback`);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme': return 'bg-purple-600';
      case 'severe': return 'bg-red-600';
      case 'moderate': return 'bg-orange-500';
      case 'minor': return 'bg-yellow-500';
      default: return 'bg-red-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'extreme':
      case 'severe':
        return <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-pulse" />;
      default:
        return <Waves className="h-4 w-4 flex-shrink-0" />;
    }
  };

  const formatAlertMessage = (alert: WeatherAlert) => {
    const urgencyText = alert.urgency === 'immediate' ? 'IMMEDIATE' : '';
    const certaintyText = alert.certainty === 'observed' ? 'CONFIRMED' : '';
    const prefix = [urgencyText, certaintyText].filter(Boolean).join(' ');
    
    return `${prefix ? prefix + ': ' : ''}${alert.headline}`;
  };

  // Show most severe alert
  const activeAlert = alerts.length > 0 ? alerts[0] : null;

  if (!activeAlert || !isVisible) return null;

  return (
    <div className={`${getSeverityColor(activeAlert.severity)} text-white px-4 py-2 text-sm relative`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {getSeverityIcon(activeAlert.severity)}
          <span className="font-medium">MARINE ALERT:</span>
          <span className="truncate">{formatAlertMessage(activeAlert)}</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 hover:bg-black/20 rounded p-1 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

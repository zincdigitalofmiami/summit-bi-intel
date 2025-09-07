import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { weatherApiLimit } from '@/lib/rate-limit';

// Type for weather alert
interface WeatherAlert {
  id: string;
  severity: string;
  headline: string;
  description: string;
  areas: string[];
  effective: string;
  expires: string;
  urgency: string;
  certainty: string;
}

// Validate zone parameter
function validateZones(zones: string | null): string {
  if (!zones) return 'FLZ112,FLZ134,FLZ230';
  
  // Only allow specific NOAA zone patterns
  const validZonePattern = /^[A-Z]{2}Z\d{3}(,[A-Z]{2}Z\d{3})*$/;
  if (!validZonePattern.test(zones)) {
    throw new Error('Invalid zone format');
  }
  
  // Limit to maximum 10 zones to prevent abuse
  const zoneArray = zones.split(',');
  if (zoneArray.length > 10) {
    throw new Error('Too many zones requested');
  }
  
  return zones;
}

export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = weatherApiLimit.check(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '30',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        }
      }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const rawZones = searchParams.get('zones');
    const zones = validateZones(rawZones);

    // NOAA NWS API - Active Alerts
    const response = await fetch(
      `https://api.weather.gov/alerts/active?zone=${zones}`,
      {
        headers: {
          'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );

    if (!response.ok) {
      throw new Error(`NOAA API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform NOAA data to our format
    const alerts = (data.features || []).map((feature: { properties: Record<string, unknown> }) => ({
      id: feature.properties.id as string,
      severity: feature.properties.severity as string,
      headline: feature.properties.headline as string,
      description: feature.properties.description as string,
      areas: feature.properties.areas as string[] || [],
      effective: feature.properties.effective as string,
      expires: feature.properties.expires as string,
      urgency: feature.properties.urgency as string,
      certainty: feature.properties.certainty as string,
    }));

    // Sort by severity (extreme first)
    const severityOrder = { extreme: 4, severe: 3, moderate: 2, minor: 1 };
    alerts.sort((a: WeatherAlert, b: WeatherAlert) => 
      (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
      (severityOrder[a.severity as keyof typeof severityOrder] || 0)
    );

    return NextResponse.json({
      alerts,
      lastUpdated: new Date().toISOString(),
      source: 'NOAA National Weather Service',
    });

  } catch (error) {
    // Handle validation errors differently from API errors
    if (error instanceof Error && (error.message.includes('Invalid zone') || error.message.includes('Too many zones'))) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Return mock data for development or when API is down
    const mockAlert = {
      id: 'mock-alert-001',
      severity: 'moderate' as const,
      headline: 'Small Craft Advisory in Effect for St. Andrews Bay',
      description: 'Winds 15-25 knots with gusts to 30 knots. Wave heights 3-5 feet. Marine contractors should exercise caution with offshore seawall and dock construction activities.',
      areas: ['St. Andrews Bay', 'Panama City Beach', 'Bay County Waters'],
      effective: new Date().toISOString(),
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      urgency: 'expected' as const,
      certainty: 'likely' as const,
    };

    return NextResponse.json({
      alerts: [mockAlert],
      lastUpdated: new Date().toISOString(),
      source: 'Fallback Data (NOAA unavailable)',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

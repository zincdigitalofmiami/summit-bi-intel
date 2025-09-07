import { NextRequest, NextResponse } from 'next/server';

interface NOAAAlert {
  id: string;
  properties: {
    headline: string;
    description: string;
    severity: 'minor' | 'moderate' | 'severe' | 'extreme';
    urgency: 'immediate' | 'expected' | 'future';
    certainty: 'observed' | 'likely' | 'possible';
    areas: string[];
    effective: string;
    expires: string;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const zones = searchParams.get('zones') || 'FLZ112,FLZ134,FLZ230'; // Panama City area zones

  try {
    // NOAA NWS API - Active Alerts
    const response = await fetch(
      `https://api.weather.gov/alerts/active?zone=${zones}`,
      {
        headers: {
          'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`NOAA API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform NOAA data to our format
    const alerts = data.features?.map((feature: NOAAAlert) => ({
      id: feature.id,
      severity: feature.properties.severity,
      headline: feature.properties.headline,
      description: feature.properties.description,
      areas: feature.properties.areas || [],
      effective: feature.properties.effective,
      expires: feature.properties.expires,
      urgency: feature.properties.urgency,
      certainty: feature.properties.certainty,
    })) || [];

    // Sort by severity (extreme first)
    const severityOrder = { extreme: 4, severe: 3, moderate: 2, minor: 1 };
    alerts.sort((a: any, b: any) => 
      (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
      (severityOrder[a.severity as keyof typeof severityOrder] || 0)
    );

    return NextResponse.json({
      alerts,
      lastUpdated: new Date().toISOString(),
      source: 'NOAA National Weather Service',
    });

  } catch (error) {
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

import { NextResponse, type NextRequest } from 'next/server';
import { WeatherService } from '@/services/weather';
import { weatherApiLimit } from '@/lib/rate-limit';

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
    const weatherData = await WeatherService.getCurrentWeather();

    return NextResponse.json({
      ...weatherData,
      lastUpdated: new Date().toISOString(),
      source: 'NOAA National Weather Service'
    });

  } catch (error) {
    console.warn('Weather API failed, using fallback:', error);

    // Return fallback data when API fails
    const fallbackData = {
      location: "Panama City, FL",
      temperature: 78,
      condition: "Clear",
      humidity: 68,
      windSpeed: 12,
      windDirection: "NE",
      visibility: 10,
      waveHeight: "1-2",
      tideStatus: "Rising",
      tideHeight: 2.3,
      marineCondition: "Good",
      alerts: [],
      uvIndex: 7,
      dewPoint: 72,
      barometricPressure: 30.15,
      lastUpdated: new Date().toISOString(),
      source: 'Fallback Data (NOAA unavailable)',
      error: error instanceof Error ? error.message : 'Unknown error'
    };

    return NextResponse.json(fallbackData, {
      status: 200, // Still return 200 with fallback data
    });
  }
}

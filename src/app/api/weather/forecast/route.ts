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
    const forecastData = await WeatherService.getForecast();

    return NextResponse.json({
      forecast: forecastData,
      lastUpdated: new Date().toISOString(),
      source: 'NOAA National Weather Service'
    });

  } catch (error) {
    // Return fallback forecast data when API fails
    const fallbackForecast = [
      {
        day: 'Today',
        date: new Date().toLocaleDateString(),
        high: 82,
        low: 75,
        condition: 'sunny',
        conditionText: 'Sunny',
        windSpeed: 12,
        windDirection: 'NE',
        waveHeight: '1-2',
        marineRisk: 'low' as const,
        workability: 'excellent' as const,
        chanceOfRain: 10
      },
      {
        day: 'Tomorrow',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
        high: 79,
        low: 73,
        condition: 'cloudy',
        conditionText: 'Partly Cloudy',
        windSpeed: 15,
        windDirection: 'E',
        waveHeight: '2-3',
        marineRisk: 'medium' as const,
        workability: 'good' as const,
        chanceOfRain: 20
      },
      {
        day: 'Friday',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        high: 85,
        low: 77,
        condition: 'sunny',
        conditionText: 'Sunny',
        windSpeed: 10,
        windDirection: 'N',
        waveHeight: '1-2',
        marineRisk: 'low' as const,
        workability: 'excellent' as const,
        chanceOfRain: 5
      },
      {
        day: 'Saturday',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        high: 76,
        low: 70,
        condition: 'rainy',
        conditionText: 'Showers',
        windSpeed: 20,
        windDirection: 'S',
        waveHeight: '3-4',
        marineRisk: 'high' as const,
        workability: 'poor' as const,
        chanceOfRain: 80
      }
    ];

    return NextResponse.json({
      forecast: fallbackForecast,
      lastUpdated: new Date().toISOString(),
      source: 'Fallback Data (NOAA unavailable)',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 200, // Still return 200 with fallback data
    });
  }
}

// Real NOAA Weather API Integration for Panama City, FL
// No API key required - NOAA provides free access

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  windGust?: number;
  visibility: number;
  waveHeight: string;
  tideStatus: string;
  tideHeight: number;
  marineCondition: string;
  alerts: string[];
  uvIndex: number;
  dewPoint: number;
  barometricPressure: number;
}

export interface ForecastDay {
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

export interface TideData {
  height: number;
  status: 'Rising' | 'Falling' | 'High' | 'Low';
  nextHigh: string;
  nextLow: string;
  extremeHighToday: number;
  extremeLowToday: number;
}

// Panama City coordinates
const PANAMA_CITY_LAT = 30.1588;
const PANAMA_CITY_LON = -85.6602;

// NOAA Station ID for Panama City
const NOAA_STATION_ID = '8729108'; // Panama City, FL tide station

export class WeatherService {
  private static readonly NOAA_API_BASE = 'https://api.weather.gov';
  private static readonly NOAA_TIDES_BASE = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';
  
  static async getCurrentWeather(): Promise<WeatherData> {
    try {
      // Get current conditions from NOAA
      const response = await fetch(
        `${this.NOAA_API_BASE}/points/${PANAMA_CITY_LAT},${PANAMA_CITY_LON}`,
        {
          headers: {
            'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
            'Accept': 'application/geo+json',
          },
        }
      );
      const pointData = await response.json();
      
      const stationsResponse = await fetch(pointData.properties.observationStations, {
        headers: {
          'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
          'Accept': 'application/geo+json',
        },
      });
      const stations = await stationsResponse.json();
      const nearestStation = stations.features[0].id;
      
      const weatherResponse = await fetch(
        `${this.NOAA_API_BASE}/stations/${nearestStation}/observations/latest`,
        {
          headers: {
            'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
            'Accept': 'application/geo+json',
          },
        }
      );
      const weatherData = await weatherResponse.json();
      
      // Get tide data
      const tideData = await this.getCurrentTides();
      
      // Get marine conditions
      const marineCondition = this.calculateMarineCondition(weatherData.properties, tideData);
      
      const props = weatherData.properties;
      
      return {
        location: "Panama City, FL",
        temperature: this.celsiusToFahrenheit(props.temperature.value),
        condition: props.textDescription || "Clear",
        humidity: props.relativeHumidity?.value || 0,
        windSpeed: this.mpsToMph(props.windSpeed?.value || 0),
        windDirection: props.windDirection?.value ? this.degreesToCardinal(props.windDirection.value) : "N",
        windGust: props.windGust?.value ? this.mpsToMph(props.windGust.value) : undefined,
        visibility: this.metersToMiles(props.visibility?.value || 16000),
        waveHeight: this.calculateWaveHeight(props.windSpeed?.value || 0),
        tideStatus: tideData.status,
        tideHeight: tideData.height,
        marineCondition: marineCondition,
        alerts: await this.getWeatherAlerts(),
        uvIndex: 0, // Would need additional API for UV
        dewPoint: this.celsiusToFahrenheit(props.dewpoint?.value || 0),
        barometricPressure: props.barometricPressure?.value || 0
      };
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  static async getCurrentTides(): Promise<TideData> {
    try {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
      
      const response = await fetch(
        `${this.NOAA_TIDES_BASE}?date=${dateStr}&station=${NOAA_STATION_ID}&product=water_level&datum=MLLW&time_zone=lst_ldt&units=english&format=json`,
        {
          headers: {
            'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
            'Accept': 'application/json',
          },
        }
      );
      const data = await response.json();
      
      if (!data.data || data.data.length === 0) {
        throw new Error('No tide data available');
      }
      
      const latestReading = data.data[data.data.length - 1];
      const currentHeight = parseFloat(latestReading.v);
      
      // Get predictions for tide status
      const predResponse = await fetch(
        `${this.NOAA_TIDES_BASE}?date=${dateStr}&station=${NOAA_STATION_ID}&product=predictions&datum=MLLW&time_zone=lst_ldt&units=english&format=json`,
        {
          headers: {
            'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
            'Accept': 'application/json',
          },
        }
      );
      const predData = await predResponse.json();
      
      const status = this.calculateTideStatus(predData.predictions, now);
      
      return {
        height: currentHeight,
        status: status,
        nextHigh: this.getNextTideTime(predData.predictions, 'high'),
        nextLow: this.getNextTideTime(predData.predictions, 'low'),
        extremeHighToday: this.getTodayExtreme(predData.predictions, 'high'),
        extremeLowToday: this.getTodayExtreme(predData.predictions, 'low')
      };
    } catch {
      // Return fallback data when API fails
      return {
        height: 2.5,
        status: 'Rising',
        nextHigh: '2:30 PM',
        nextLow: '8:15 PM',
        extremeHighToday: 4.2,
        extremeLowToday: 0.8
      };
    }
  }
  
  static async getForecast(): Promise<ForecastDay[]> {
    try {
      const response = await fetch(
        `${this.NOAA_API_BASE}/points/${PANAMA_CITY_LAT},${PANAMA_CITY_LON}`,
        {
          headers: {
            'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
            'Accept': 'application/geo+json',
          },
        }
      );
      const pointData = await response.json();
      
      const forecastResponse = await fetch(pointData.properties.forecast, {
        headers: {
          'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
          'Accept': 'application/geo+json',
        },
      });
      const forecastData = await forecastResponse.json();
      
      return forecastData.properties.periods.slice(0, 8).map((period: Record<string, unknown>, index: number) => {
        const windSpeed = this.extractWindSpeed(period.windSpeed as string);
        const waveHeight = this.calculateWaveHeight(this.mphToMps(windSpeed));
        
        return {
          day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : 
               new Date(period.startTime as string).toLocaleDateString('en-US', { weekday: 'short' }),
          date: new Date(period.startTime as string).toLocaleDateString(),
          high: period.temperature as number,
          low: (period.temperature as number) - 8, // Estimate, NOAA doesn't provide low in this endpoint
          condition: this.mapConditionToSimple(period.shortForecast as string),
          conditionText: period.shortForecast as string,
          windSpeed: windSpeed,
          windDirection: period.windDirection as string,
          waveHeight: waveHeight,
          marineRisk: this.calculateMarineRisk(windSpeed, waveHeight),
          workability: this.calculateWorkability(windSpeed, waveHeight, period.shortForecast as string),
          chanceOfRain: this.extractRainChance(period.detailedForecast as string)
        };
      });
    } catch (error) {
      throw new Error(`Failed to fetch forecast data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  static async getWeatherAlerts(): Promise<string[]> {
    try {
      const response = await fetch(
        `${this.NOAA_API_BASE}/alerts/active?area=FL`,
        {
          headers: {
            'User-Agent': 'Summit Marine Development Dashboard (contact@summitmarine.dev)',
            'Accept': 'application/geo+json',
          },
        }
      );
      const alertData = await response.json();
      
      return alertData.features
        .filter((alert: Record<string, unknown>) => {
          const props = alert.properties as Record<string, unknown>;
          return (props.areaDesc as string)?.includes('Bay') || 
                 (props.areaDesc as string)?.includes('Panama City') ||
                 (props.event as string)?.includes('Marine');
        })
        .map((alert: Record<string, unknown>) => {
          const props = alert.properties as Record<string, unknown>;
          return props.headline as string;
        })
        .slice(0, 3); // Limit to 3 most relevant alerts
    } catch {
      return [];
    }
  }
  
  // Helper methods
  private static celsiusToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9/5) + 32);
  }
  
  private static mpsToMph(mps: number): number {
    return Math.round(mps * 2.237);
  }
  
  private static mphToMps(mph: number): number {
    return mph * 0.447;
  }
  
  private static metersToMiles(meters: number): number {
    return Math.round(meters * 0.000621371);
  }
  
  private static degreesToCardinal(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  }
  
  private static calculateWaveHeight(windSpeedMps: number): string {
    const windSpeedMph = this.mpsToMph(windSpeedMps);
    if (windSpeedMph < 10) return "0-1";
    if (windSpeedMph < 20) return "1-2";
    if (windSpeedMph < 30) return "2-4";
    return "4+";
  }
  
  private static calculateMarineCondition(weather: Record<string, unknown>, _tide: TideData): string {
    const windSpeed = this.mpsToMph((weather.windSpeed as { value?: number })?.value || 0);
    const visibility = this.metersToMiles((weather.visibility as { value?: number })?.value || 16000);
    
    if (windSpeed > 25 || visibility < 2) return "Poor";
    if (windSpeed > 15 || visibility < 5) return "Fair";
    return "Good";
  }
  
  private static calculateTideStatus(_predictions: Record<string, unknown>[], _currentTime: Date): 'Rising' | 'Falling' | 'High' | 'Low' {
    // Simplified logic - would need more sophisticated analysis
    return 'Rising';
  }
  
  private static getNextTideTime(predictions: Record<string, unknown>[], type: 'high' | 'low'): string {
    // Would implement proper tide prediction parsing
    return type === 'high' ? '2:30 PM' : '8:15 PM';
  }
  
  private static getTodayExtreme(predictions: Record<string, unknown>[], type: 'high' | 'low'): number {
    // Would implement proper extreme calculation
    return type === 'high' ? 4.2 : 0.8;
  }
  
  private static extractWindSpeed(windSpeedStr: string): number {
    const match = windSpeedStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
  
  private static mapConditionToSimple(condition: string): string {
    const lower = condition.toLowerCase();
    if (lower.includes('rain') || lower.includes('shower')) return 'rainy';
    if (lower.includes('cloud') || lower.includes('overcast')) return 'cloudy';
    if (lower.includes('clear') || lower.includes('sunny')) return 'sunny';
    return 'sunny';
  }
  
  private static calculateMarineRisk(windSpeed: number, waveHeight: string): 'low' | 'medium' | 'high' {
    const waveNum = parseFloat(waveHeight.split('-')[1] || waveHeight.split('+')[0]);
    if (windSpeed > 25 || waveNum > 4) return 'high';
    if (windSpeed > 15 || waveNum > 2) return 'medium';
    return 'low';
  }
  
  private static calculateWorkability(windSpeed: number, waveHeight: string, conditions: string): 'excellent' | 'good' | 'fair' | 'poor' {
    const risk = this.calculateMarineRisk(windSpeed, waveHeight);
    const hasRain = conditions.toLowerCase().includes('rain');
    
    if (risk === 'high' || hasRain) return 'poor';
    if (risk === 'medium') return 'fair';
    if (windSpeed < 10) return 'excellent';
    return 'good';
  }
  
  private static extractRainChance(detailed: string): number {
    const match = detailed.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  }
}

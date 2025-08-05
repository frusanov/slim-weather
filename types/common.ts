import { AirQuality, WeatherCondition } from "./weather-api";

export interface CommonWeatherFormat {
  // Always available
  condition: WeatherCondition;
  uv: number;
  air_quality?: AirQuality;

  // Temperature (normalized)
  temperature_c: number; // current temp, avg temp, or null
  temperature_f: number;
  feels_like_c?: number; // only for Current/Hour
  feels_like_f?: number;

  // Wind (normalized)
  wind_speed_kph: number; // current wind or max wind for Day
  wind_speed_mph: number;
  wind_direction?: number; // only for Current/Hour
  wind_dir?: string;

  // Precipitation
  precipitation_mm: number; // current precip or total for Day
  precipitation_in: number;

  // Other common fields
  humidity: number; // current or average
  visibility_km: number; // current or average
  visibility_miles: number;

  // Meta information
  type: "current" | "day" | "hour";
  time?: string; // for Hour and Current
  date?: string; // for Day
}

import type { CommonWeatherFormat } from "../../types/common.js";
import type { UserPreferences, TemperatureUnit } from "../../types/preferences.js";
import { getTemperatureValue, getTemperatureSymbol, formatTemperature } from "./server.js";

/**
 * Format weather data according to user preferences
 */
export function formatWeatherWithPreferences(
  weather: CommonWeatherFormat,
  preferences: UserPreferences,
): FormattedWeatherData {
  const unit = preferences.temperatureUnit;

  return {
    ...weather,
    temperature: getTemperatureValue(weather.temperature_c, weather.temperature_f, unit),
    temperatureSymbol: getTemperatureSymbol(unit),
    temperatureFormatted: formatTemperature(weather.temperature_c, weather.temperature_f, unit),
    feelsLike: weather.feels_like_c && weather.feels_like_f
      ? getTemperatureValue(weather.feels_like_c, weather.feels_like_f, unit)
      : undefined,
    feelsLikeFormatted: weather.feels_like_c && weather.feels_like_f
      ? formatTemperature(weather.feels_like_c, weather.feels_like_f, unit)
      : undefined,
    windSpeed: unit === "f" ? weather.wind_speed_mph : weather.wind_speed_kph,
    windSpeedUnit: unit === "f" ? "mph" : "km/h",
    visibility: unit === "f" ? weather.visibility_miles : weather.visibility_km,
    visibilityUnit: unit === "f" ? "miles" : "km",
    precipitation: unit === "f" ? weather.precipitation_in : weather.precipitation_mm,
    precipitationUnit: unit === "f" ? "in" : "mm",
  };
}

/**
 * Weather data formatted according to user preferences
 */
export interface FormattedWeatherData extends CommonWeatherFormat {
  // Primary temperature display
  temperature: number;
  temperatureSymbol: string;
  temperatureFormatted: string;

  // Feels like temperature
  feelsLike?: number;
  feelsLikeFormatted?: string;

  // Units adjusted for preference
  windSpeed: number;
  windSpeedUnit: string;
  visibility: number;
  visibilityUnit: string;
  precipitation: number;
  precipitationUnit: string;
}

/**
 * Format temperature specifically with preferences
 */
export function formatTemperatureWithPreferences(
  tempC: number,
  tempF: number,
  preferences: UserPreferences,
): string {
  return formatTemperature(tempC, tempF, preferences.temperatureUnit);
}

/**
 * Get temperature value with preferences
 */
export function getTemperatureWithPreferences(
  tempC: number,
  tempF: number,
  preferences: UserPreferences,
): number {
  return getTemperatureValue(tempC, tempF, preferences.temperatureUnit);
}

/**
 * Get all units for display based on preferences
 */
export function getUnitsForPreferences(preferences: UserPreferences) {
  const unit = preferences.temperatureUnit;
  return {
    temperature: getTemperatureSymbol(unit),
    windSpeed: unit === "f" ? "mph" : "km/h",
    visibility: unit === "f" ? "miles" : "km",
    precipitation: unit === "f" ? "in" : "mm",
  };
}

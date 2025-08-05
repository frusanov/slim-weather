import type { Context } from "hono";
import type {
  UserPreferences,
  TemperatureUnit,
} from "../../types/preferences.js";
import {
  DEFAULT_PREFERENCES,
  regionSettingsToPreferences,
} from "../../types/preferences.js";
import {
  getRegionSettings,
  defaultRegionSettings,
} from "../region-settings/index.js";

const COOKIE_NAME = "slim-weather-prefs";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Parse preferences from cookie string
 */
function parsePreferences(cookieValue: string): UserPreferences {
  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue));
    return {
      ...DEFAULT_PREFERENCES,
      ...parsed,
      temperatureUnit: parsed.temperatureUnit === "f" ? "f" : "c",
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

/**
 * Serialize preferences to cookie string
 */
function serializePreferences(prefs: UserPreferences): string {
  return encodeURIComponent(JSON.stringify(prefs));
}

/**
 * Get user preferences from request cookies, with region-based defaults
 */
export async function getPreferences(
  c: Context,
  iso3166Code?: string,
): Promise<UserPreferences> {
  const cookieValue = c.req
    .header("cookie")
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

  // If no cookie exists, use region-based defaults
  if (!cookieValue) {
    if (iso3166Code) {
      const regionSettings = await getRegionSettings(iso3166Code);
      return regionSettingsToPreferences(regionSettings);
    }
    return regionSettingsToPreferences(defaultRegionSettings);
  }

  return parsePreferences(cookieValue);
}

/**
 * Get user preferences from request cookies synchronously (fallback to global default)
 */
export function getPreferencesSync(c: Context): UserPreferences {
  const cookieValue = c.req
    .header("cookie")
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
  if (!cookieValue) {
    return DEFAULT_PREFERENCES;
  }
  return parsePreferences(cookieValue);
}

/**
 * Set user preferences cookie in response
 */
export function setPreferences(c: Context, preferences: UserPreferences): void {
  const cookieValue = serializePreferences(preferences);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const cookieString = `${COOKIE_NAME}=${cookieValue}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax; HttpOnly=false${secure}`;
  c.header("Set-Cookie", cookieString);
}

/**
 * Update a specific preference and set cookie
 */
export function updatePreference<K extends keyof UserPreferences>(
  c: Context,
  key: K,
  value: UserPreferences[K],
): UserPreferences {
  const currentPrefs = getPreferencesSync(c);
  const newPrefs = { ...currentPrefs, [key]: value };
  setPreferences(c, newPrefs);
  return newPrefs;
}

/**
 * Get temperature value in user's preferred unit
 */
export function getTemperatureValue(
  tempC: number,
  tempF: number,
  unit: TemperatureUnit,
): number {
  return unit === "f" ? tempF : tempC;
}

/**
 * Get temperature unit symbol
 */
export function getTemperatureSymbol(unit: TemperatureUnit): string {
  return unit === "f" ? "°F" : "°C";
}

/**
 * Format temperature with unit symbol
 */
export function formatTemperature(
  tempC: number,
  tempF: number,
  unit: TemperatureUnit,
): string {
  const value = getTemperatureValue(tempC, tempF, unit);
  const symbol = getTemperatureSymbol(unit);
  return `${Math.round(value)}${symbol}`;
}

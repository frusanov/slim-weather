import type { RegionSettings } from "../utils/region-settings/index.js";

export type TemperatureUnit = "c" | "f";

export interface UserPreferences {
  temperatureUnit: TemperatureUnit;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  temperatureUnit: "c",
};

/**
 * Convert RegionSettings to UserPreferences format
 */
export function regionSettingsToPreferences(
  regionSettings: RegionSettings,
): UserPreferences {
  return {
    temperatureUnit: regionSettings.temperature,
  };
}

/**
 * Convert UserPreferences to RegionSettings format
 */
export function preferencesToRegionSettings(
  preferences: UserPreferences,
): RegionSettings {
  return {
    temperature: preferences.temperatureUnit,
  };
}

export type TemperatureUnit = "c" | "f";

export interface UserPreferences {
  temperature: TemperatureUnit;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  temperature: "c",
};

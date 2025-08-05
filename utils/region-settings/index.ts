export interface RegionSettings {
  temperature: "c" | "f";
}

export const defaultRegionSettings: RegionSettings = {
  temperature: "c",
};

/**
 * Extract country code from ISO 3166-2 code (e.g., "US-CA" -> "us")
 */
function getCountryCode(iso3166Code: string): string | null {
  return iso3166Code.split("-")[0]?.toLowerCase() || null;
}

export async function getRegionSettings(iso3166Code: string) {
  try {
    const countryCode = getCountryCode(iso3166Code);

    const { default: regions } = await import(`./countries/${countryCode}.js`);

    return regions[iso3166Code] as RegionSettings;
  } catch {
    return defaultRegionSettings;
  }
}

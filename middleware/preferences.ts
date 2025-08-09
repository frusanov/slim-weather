import { DEFAULT_PREFERENCES, UserPreferences } from "@/types/preferences";
import { preferencesSchema } from "@/validators/preferences";
import { getRegionSettings } from "@/utils/region-settings";
import { Context, MiddlewareHandler } from "hono";
import { getCookie, setCookie } from "hono/cookie";

declare module "hono" {
  interface Context {
    preferences: {
      data: UserPreferences;
      update: (preferences: Partial<UserPreferences>) => void;
    };
  }
}

export const preferencesMiddleware: MiddlewareHandler = async (c, next) => {
  const fromCookieRaw = getCookie(c, "preferences");

  // Get region-based default preferences
  let regionDefaults = DEFAULT_PREFERENCES;
  if (c.location?.country && c.location?.countryRegion) {
    const iso3166Code = `${c.location.country.toUpperCase()}-${c.location.countryRegion}`;
    regionDefaults = await getRegionSettings(iso3166Code);
  }

  const fromCookie = fromCookieRaw
    ? await preferencesSchema.parseAsync(JSON.parse(fromCookieRaw))
    : regionDefaults;

  const updatePreferences: Context["preferences"]["update"] = (preferences) => {
    c.preferences.data = {
      ...c.preferences.data,
      ...preferences,
    };
  };

  c.preferences = {
    data: fromCookie,
    update: updatePreferences,
  };

  await next();

  setCookie(c, "preferences", JSON.stringify(c.preferences.data), {
    httpOnly: true,
    sameSite: "Lax",
  });
};

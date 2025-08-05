import { DEFAULT_PREFERENCES, UserPreferences } from "@/types/preferences";
import { preferencesSchema } from "@/validators/preferences";
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

  const fromCookie = fromCookieRaw
    ? await preferencesSchema.parseAsync(JSON.parse(fromCookieRaw))
    : DEFAULT_PREFERENCES;

  const updatePreferences: Context["preferences"]["update"] = (preferences) => {
    c.preferences.data = {
      ...fromCookie,
      ...preferences,
    };

    setCookie(c, "preferences", JSON.stringify(c.preferences.data));
  };

  c.preferences = {
    data: fromCookie,
    update: updatePreferences,
  };

  return await next();
};

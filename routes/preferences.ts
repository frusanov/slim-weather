import { Hono } from "hono";
import type { UserPreferences, TemperatureUnit } from "../types/preferences.js";
import {
  getPreferences,
  getPreferencesSync,
  setPreferences,
  updatePreference,
} from "../utils/preferences/server.js";

export const preferencesRoute = new Hono();

/**
 * GET /api/preferences - Get current user preferences
 */
preferencesRoute.get("/", async (c) => {
  try {
    const iso3166Code = c.req.query("region");
    const preferences = await getPreferences(c, iso3166Code);

    return c.json({
      success: true,
      data: preferences,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to get preferences",
      },
      500,
    );
  }
});

/**
 * POST /api/preferences - Update user preferences
 */
preferencesRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const preferences = body as Partial<UserPreferences>;

    // Validate preferences
    if (preferences.temperatureUnit && !["c", "f"].includes(preferences.temperatureUnit)) {
      return c.json(
        {
          success: false,
          error: "Invalid temperature unit. Must be 'c' or 'f'",
        },
        400,
      );
    }

    const currentPrefs = getPreferencesSync(c);
    const newPrefs = { ...currentPrefs, ...preferences };
    setPreferences(c, newPrefs);

    return c.json({
      success: true,
      data: newPrefs,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to update preferences",
      },
      500,
    );
  }
});

/**
 * PUT /api/preferences/temperature - Update temperature unit preference
 */
preferencesRoute.put("/temperature", async (c) => {
  try {
    const body = await c.req.json();
    const { unit } = body as { unit: TemperatureUnit };

    if (!unit || !["c", "f"].includes(unit)) {
      return c.json(
        {
          success: false,
          error: "Invalid temperature unit. Must be 'c' or 'f'",
        },
        400,
      );
    }

    const updatedPrefs = updatePreference(c, "temperatureUnit", unit);

    return c.json({
      success: true,
      data: updatedPrefs,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to update temperature preference",
      },
      500,
    );
  }
});

/**
 * POST /api/preferences/toggle-temperature - Toggle temperature unit
 */
preferencesRoute.post("/toggle-temperature", async (c) => {
  try {
    const currentPrefs = getPreferencesSync(c);
    const newUnit: TemperatureUnit = currentPrefs.temperatureUnit === "c" ? "f" : "c";
    const updatedPrefs = updatePreference(c, "temperatureUnit", newUnit);

    return c.json({
      success: true,
      data: updatedPrefs,
      toggled: {
        from: currentPrefs.temperatureUnit,
        to: newUnit,
      },
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to toggle temperature preference",
      },
      500,
    );
  }
});

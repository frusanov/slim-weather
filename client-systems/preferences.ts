import { DEFAULT_PREFERENCES, type UserPreferences } from "@/types/preferences";
import {
  $slot,
  setText,
  setAttr,
  getTempSymbol,
  updateTempElements,
  updateWeatherElements,
  registerSystem,
} from "./_shared";

declare module "@/types/client" {
  interface Systems {
    preferences?: {
      data: UserPreferences;
      update: (preferences: Partial<UserPreferences>) => Promise<void>;
      toggleTemperatureUnit: () => Promise<void>;
    };
  }
}

async function update(preferences: Partial<UserPreferences>) {
  window.__app_preferences__ = await window.systems.loading.withLoading(
    fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    })
      .then((r) => r.json())
      .then((r) => r.data)
      .catch(() => DEFAULT_PREFERENCES),
  );

  updateTemperatureDisplays(window.__app_preferences__);

  // Update cached temperatures in weather system if available
  if (window.systems.weather?.updateCachedTemperatures) {
    window.systems.weather.updateCachedTemperatures(
      window.__app_preferences__.temperature,
    );
  }
}

/**
 * Update temperature displays throughout the page
 */
function updateTemperatureDisplays(preferences: UserPreferences): void {
  const unit = preferences.temperature;
  const symbol = getTempSymbol(unit);

  // Update temperature displays with data-temp-c and data-temp-f attributes
  updateTempElements(document, unit);

  // Update weather unit displays (wind speed, visibility, precipitation)
  updateWeatherElements(document, unit);

  // Update temperature toggle symbol
  setText($slot("temp-toggle-symbol"), symbol);

  // Update data-temp-unit attribute on toggle button
  setAttr(
    document.querySelector("[data-temp-unit]") as HTMLElement,
    "temp-unit",
    unit,
  );
}

registerSystem("preferences", {
  get data() {
    return window.__app_preferences__;
  },

  update,

  toggleTemperatureUnit: async () => {
    const current = window.systems.preferences!.data;
    const temperature = current.temperature === "c" ? "f" : "c";

    await update({
      temperature,
    });
  },
});

import { DEFAULT_PREFERENCES, type UserPreferences } from "@/types/preferences";

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
  const symbol = unit === "c" ? "°C" : "°F";

  // Update temperature displays with data-temp-c and data-temp-f attributes
  const $elements = document.querySelectorAll(`[data-temp-c][data-temp-f]`);

  $elements.forEach(($el) => {
    if (!($el instanceof HTMLElement)) return;

    $el.innerText =
      ((unit === "c" ? $el.dataset.tempC : $el.dataset.tempF) as string) +
      symbol;
  });

  // Update temperature toggle symbol
  const $toggleSymbol = document.querySelector(
    '[data-slot="temp-toggle-symbol"]',
  );
  if ($toggleSymbol) {
    $toggleSymbol.textContent = symbol;
  }

  // Update data-temp-unit attribute on toggle button
  const $toggleButton = document.querySelector("[data-temp-unit]");
  if ($toggleButton instanceof HTMLElement) {
    $toggleButton.dataset.tempUnit = unit;
  }
}

if (!window.systems) window.systems = {} as any;

window.systems.preferences = {
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

  // setTemperatureUnit: (unit: TemperatureUnit): void => {
  //   const current = parsePreferences();
  //   const updated = { ...current, temperature: unit };
  //   savePreferences(updated);
  //   updateTemperatureDisplays();
  // },

  // getTemperatureValue: (tempC: number, tempF: number): number => {
  //   const preferences = parsePreferences();
  //   return preferences.temperature === "f" ? tempF : tempC;
  // },

  // getTemperatureSymbol: (): string => {
  //   const preferences = parsePreferences();
  //   return preferences.temperature === "f" ? "°F" : "°C";
  // },

  // formatTemperature: (tempC: number, tempF: number): string => {
  //   const preferences = parsePreferences();
  //   const value = preferences.temperature === "f" ? tempF : tempC;
  //   const symbol = preferences.temperature === "f" ? "°F" : "°C";
  //   return `${Math.round(value)}${symbol}`;
  // },

  // updateDisplay: (): void => {
  //   updateTemperatureDisplays();
  // },
};

declare global {
  interface Window {
    systems: {
      preferences?: {
        get: () => UserPreferences;
        set: (preferences: Partial<UserPreferences>) => void;
        setTemperatureUnit: (unit: TemperatureUnit) => void;
        getTemperatureValue: (tempC: number, tempF: number) => number;
        getTemperatureSymbol: () => string;
        formatTemperature: (tempC: number, tempF: number) => string;
        updateDisplay: () => void;
      };
    };
  }
}

interface UserPreferences {
  temperatureUnit: "c" | "f";
}

type TemperatureUnit = "c" | "f";

const COOKIE_NAME = "slim-weather-prefs";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Parse preferences from cookie
 */
function parsePreferences(): UserPreferences {
  const cookies = document.cookie.split(";");
  const prefsCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${COOKIE_NAME}=`),
  );

  if (!prefsCookie) {
    return { temperatureUnit: "c" };
  }

  try {
    const cookieValue = prefsCookie.split("=")[1];
    if (!cookieValue) {
      return { temperatureUnit: "c" };
    }
    const parsed = JSON.parse(decodeURIComponent(cookieValue));
    return {
      temperatureUnit: parsed.temperatureUnit === "f" ? "f" : "c",
    };
  } catch {
    return { temperatureUnit: "c" };
  }
}

/**
 * Save preferences to cookie
 */
function savePreferences(preferences: UserPreferences): void {
  const cookieValue = encodeURIComponent(JSON.stringify(preferences));
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${cookieValue}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

/**
 * Update temperature displays throughout the page
 */
function updateTemperatureDisplays(): void {
  const preferences = parsePreferences();
  const unit = preferences.temperatureUnit;

  // Update main temperature display
  const mainTempElement = document.querySelector('[data-slot="temperature_c"]');
  if (mainTempElement) {
    const tempC = parseFloat(
      mainTempElement.getAttribute("data-temp-c") ||
        mainTempElement.textContent ||
        "0",
    );
    const tempF = parseFloat(
      mainTempElement.getAttribute("data-temp-f") ||
        Math.round((tempC * 9) / 5 + 32).toString(),
    );
    const value = unit === "f" ? tempF : tempC;
    mainTempElement.textContent = Math.round(value).toString();
  }

  // Update feels like temperature
  const feelsLikeElement = document.querySelector('[data-slot="feels_like_c"]');
  if (feelsLikeElement) {
    const tempC = parseFloat(
      feelsLikeElement.getAttribute("data-feels-like-c") ||
        feelsLikeElement.textContent ||
        "0",
    );
    const tempF = parseFloat(
      feelsLikeElement.getAttribute("data-feels-like-f") ||
        Math.round((tempC * 9) / 5 + 32).toString(),
    );
    const value = unit === "f" ? tempF : tempC;
    feelsLikeElement.textContent = Math.round(value).toString();
  }

  // Update temperature unit symbols
  const unitSymbols = document.querySelectorAll(".temp-unit");
  unitSymbols.forEach((symbol) => {
    symbol.textContent = unit === "f" ? "°F" : "°C";
  });

  // Update hourly forecast temperatures
  const hourlyElements = document.querySelectorAll("[data-temp-c]");
  hourlyElements.forEach((element) => {
    const tempC = parseFloat(element.getAttribute("data-temp-c") || "0");
    const tempF = parseFloat(
      element.getAttribute("data-temp-f") ||
        Math.round((tempC * 9) / 5 + 32).toString(),
    );
    const value = unit === "f" ? tempF : tempC;
    const symbol = unit === "f" ? "°F" : "°C";

    // Find the temperature text node and update it
    const textContent = element.textContent || "";
    const newContent = textContent.replace(
      /\d+°[CF]/,
      `${Math.round(value)}${symbol}`,
    );
    element.textContent = newContent;
  });

  // Update daily forecast temperatures
  const dailyElements = document.querySelectorAll("[data-maxtemp-c]");
  dailyElements.forEach((element) => {
    const tempC = parseFloat(element.getAttribute("data-maxtemp-c") || "0");
    const tempF = parseFloat(
      element.getAttribute("data-maxtemp-f") ||
        Math.round((tempC * 9) / 5 + 32).toString(),
    );
    const value = unit === "f" ? tempF : tempC;
    const symbol = unit === "f" ? "°F" : "°C";

    // Find and update the temperature line
    const textContent = element.textContent || "";
    const newContent = textContent.replace(
      /Temp: \d+°[CF]/,
      `Temp: ${Math.round(value)}${symbol}`,
    );
    element.textContent = newContent;
  });

  // Update wind speed
  const windElements = document.querySelectorAll("[data-wind-kph]");
  windElements.forEach((element) => {
    const windKph = parseFloat(element.getAttribute("data-wind-kph") || "0");
    const windMph = parseFloat(
      element.getAttribute("data-wind-mph") ||
        Math.round(windKph * 0.621371).toString(),
    );
    const value = unit === "f" ? windMph : windKph;
    const windUnit = unit === "f" ? "mph" : "km/h";

    element.textContent = Math.round(value).toString();

    // Update the unit in the parent text
    const parent = element.parentElement;
    if (parent) {
      const text = parent.textContent || "";
      const newText = text.replace(/(km\/h|mph)/, windUnit);
      parent.innerHTML = parent.innerHTML.replace(text, newText);
    }
  });

  // Update visibility
  const visibilityElements = document.querySelectorAll("[data-visibility-km]");
  visibilityElements.forEach((element) => {
    const visibilityKm = parseFloat(
      element.getAttribute("data-visibility-km") || "0",
    );
    const visibilityMiles = parseFloat(
      element.getAttribute("data-visibility-miles") ||
        Math.round(visibilityKm * 0.621371).toString(),
    );
    const value = unit === "f" ? visibilityMiles : visibilityKm;
    const visibilityUnit = unit === "f" ? "miles" : "km";

    element.textContent = Math.round(value).toString();

    // Update the unit in the parent text
    const parent = element.parentElement;
    if (parent) {
      const text = parent.textContent || "";
      const newText = text.replace(/(km|miles)/, visibilityUnit);
      parent.innerHTML = parent.innerHTML.replace(text, newText);
    }
  });

  // Update precipitation
  const precipitationElements = document.querySelectorAll(
    "[data-precipitation-mm]",
  );
  precipitationElements.forEach((element) => {
    const precipitationMm = parseFloat(
      element.getAttribute("data-precipitation-mm") || "0",
    );
    const precipitationIn = parseFloat(
      element.getAttribute("data-precipitation-in") ||
        (precipitationMm * 0.0393701).toString(),
    );
    const value = unit === "f" ? precipitationIn : precipitationMm;
    const precipitationUnit = unit === "f" ? "in" : "mm";

    element.textContent = value.toFixed(unit === "f" ? 2 : 1);

    // Update the unit in the parent text
    const parent = element.parentElement;
    if (parent) {
      const text = parent.textContent || "";
      const newText = text.replace(/(mm|in)/, precipitationUnit);
      parent.innerHTML = parent.innerHTML.replace(text, newText);
    }
  });
}

// Initialize preferences system
if (!window.systems) window.systems = {};

window.systems.preferences = {
  get: (): UserPreferences => {
    return parsePreferences();
  },

  set: (preferences: Partial<UserPreferences>): void => {
    const current = parsePreferences();
    const updated = { ...current, ...preferences };
    savePreferences(updated);
    updateTemperatureDisplays();
  },

  setTemperatureUnit: (unit: TemperatureUnit): void => {
    const current = parsePreferences();
    const updated = { ...current, temperatureUnit: unit };
    savePreferences(updated);
    updateTemperatureDisplays();
  },

  getTemperatureValue: (tempC: number, tempF: number): number => {
    const preferences = parsePreferences();
    return preferences.temperatureUnit === "f" ? tempF : tempC;
  },

  getTemperatureSymbol: (): string => {
    const preferences = parsePreferences();
    return preferences.temperatureUnit === "f" ? "°F" : "°C";
  },

  formatTemperature: (tempC: number, tempF: number): string => {
    const preferences = parsePreferences();
    const value = preferences.temperatureUnit === "f" ? tempF : tempC;
    const symbol = preferences.temperatureUnit === "f" ? "°F" : "°C";
    return `${Math.round(value)}${symbol}`;
  },

  updateDisplay: (): void => {
    updateTemperatureDisplays();
  },
};

// Auto-update display on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateTemperatureDisplays);
} else {
  updateTemperatureDisplays();
}

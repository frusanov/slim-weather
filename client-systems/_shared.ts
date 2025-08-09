// Shared utilities for client systems to reduce bundle size and improve maintainability

// DOM Utilities
export const $ = (selector: string) =>
  document.querySelector(selector) as HTMLElement | null;
export const $slot = (name: string) => $(`[data-slot="${name}"]`);
export const $all = (selector: string) => document.querySelectorAll(selector);

export const setHTML = (el: HTMLElement | null, html: string) =>
  el && (el.innerHTML = html);
export const setText = (el: HTMLElement | null, text: string) =>
  el && (el.textContent = text);
export const setAttr = (el: HTMLElement | null, attr: string, value: string) =>
  el && el.setAttribute(attr, value);

// Temperature Utilities
export const getTempSymbol = (unit: "c" | "f") => (unit === "c" ? "°C" : "°F");
export const getTempValue = (unit: "c" | "f", tempC: string, tempF: string) =>
  unit === "c" ? tempC : tempF;

export const updateTempElements = (
  container: Document | HTMLElement,
  unit: "c" | "f",
) => {
  const symbol = getTempSymbol(unit);
  const elements = container.querySelectorAll("[data-temp-c][data-temp-f]");
  elements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const temp = getTempValue(unit, el.dataset.tempC!, el.dataset.tempF!);
      el.textContent = temp + symbol;
    }
  });
};

// Cache Utilities
export const createCache = <T>() => {
  const cache: Record<string, T> = {};
  return {
    get: (key: string) => cache[key],
    set: (key: string, value: T) => (cache[key] = value),
    has: (key: string) => key in cache,
    keys: () => Object.keys(cache),
    async fetch(key: string, fetcher: () => Promise<T>): Promise<T> {
      if (!this.has(key)) {
        this.set(key, await fetcher());
      }
      return this.get(key)!;
    },
  };
};

// Weather Unit Utilities
export const getWindSpeedUnit = (unit: "c" | "f") =>
  unit === "c" ? "km/h" : "mph";
export const getVisibilityUnit = (unit: "c" | "f") =>
  unit === "c" ? "km" : "mi";
export const getPrecipitationUnit = (unit: "c" | "f") =>
  unit === "c" ? "mm" : "in";

export const getWindSpeedValue = (unit: "c" | "f", kph: string, mph: string) =>
  unit === "c" ? kph : mph;
export const getVisibilityValue = (
  unit: "c" | "f",
  km: string,
  miles: string,
) => (unit === "c" ? km : miles);
export const getPrecipitationValue = (
  unit: "c" | "f",
  mm: string,
  inches: string,
) => (unit === "c" ? mm : inches);

export const updateWeatherElements = (
  container: Document | HTMLElement,
  unit: "c" | "f",
) => {
  // Update wind speed elements
  const windElements = container.querySelectorAll(
    "[data-wind-kph][data-wind-mph]",
  );
  windElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const value = getWindSpeedValue(
        unit,
        el.dataset.windKph!,
        el.dataset.windMph!,
      );
      const roundedValue = Math.round(parseFloat(value));
      el.textContent = roundedValue.toString();
    }
  });

  // Update visibility elements
  const visibilityElements = container.querySelectorAll(
    "[data-visibility-km][data-visibility-miles]",
  );
  visibilityElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const value = getVisibilityValue(
        unit,
        el.dataset.visibilityKm!,
        el.dataset.visibilityMiles!,
      );
      const roundedValue = Math.round(parseFloat(value));
      el.textContent = roundedValue.toString();
    }
  });

  // Update precipitation elements
  const precipitationElements = container.querySelectorAll(
    "[data-precipitation-mm][data-precipitation-in]",
  );
  precipitationElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const value = getPrecipitationValue(
        unit,
        el.dataset.precipitationMm!,
        el.dataset.precipitationIn!,
      );
      el.textContent = value;
    }
  });

  // Update unit labels using data-slot selectors
  setText($slot("wind-speed-unit"), getWindSpeedUnit(unit));
  setText($slot("visibility-unit"), getVisibilityUnit(unit));
  setText($slot("precipitation-unit"), getPrecipitationUnit(unit));
};

// System Registration Helper
export const registerSystem = <T>(name: string, system: T) => {
  if (!window.systems) window.systems = {} as any;
  (window.systems as any)[name] = system;
};

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

// System Registration Helper
export const registerSystem = <T>(name: string, system: T) => {
  if (!window.systems) window.systems = {} as any;
  (window.systems as any)[name] = system;
};

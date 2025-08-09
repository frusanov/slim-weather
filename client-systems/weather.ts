import {
  $slot,
  setHTML,
  setText,
  setAttr,
  updateTempElements,
  createCache,
  registerSystem,
} from "./_shared";

declare module "@/types/client" {
  interface Systems {
    weather?: {
      currentDay: string | null;
      initialHourly: string | null;
      selectedHour: string | null;
      selectedDate: string | null;
      setHour: (datetime: string) => Promise<void>;
      setDate: (date: string) => Promise<void>;
      _saveCurrent: () => void;
      restoreCurrent: () => void;
      setMode: (mode: "current" | "day" | "hour") => void;
      updateCachedTemperatures: (unit: "c" | "f") => void;
      _clearSelection: () => void;
      _highlightSelected: () => void;
    };
  }
}

// Consolidated caching using shared utility
const cacheHours = createCache<string>();
const cacheDays = createCache<string>();
const cacheDayHourly = createCache<string>();

/**
 * Update temperature displays in cached HTML strings
 */
function updateTemperaturesInHTML(html: string, unit: "c" | "f"): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  updateTempElements(doc, unit);
  return doc.body.innerHTML;
}

registerSystem("weather", {
  currentDay: null,
  initialHourly: null,
  selectedHour: null,
  selectedDate: null,

  setMode(mode: "current" | "day" | "hour") {
    const root = $slot("weather-widget");
    if (root) setAttr(root, "data-mode", mode);

    const label = $slot("mode-label");
    setText(
      label,
      mode === "current"
        ? "Current Weather"
        : mode === "day"
          ? "Day Average"
          : "Hourly Forecast",
    );

    // Show undo icon only for day/hour modes
    const undoSvg = document.querySelector(
      `.lucide-undo-2, .lucide-undo2-icon`,
    );
    const holder = undoSvg?.parentElement?.parentElement as
      | HTMLElement
      | undefined;
    if (holder) holder.style.display = mode === "current" ? "none" : "flex";

    // Clear selection when returning to current mode
    if (mode === "current") {
      window.systems.weather?._clearSelection();
    } else {
      window.systems.weather?._highlightSelected();
    }
  },

  _saveCurrent: () => {
    if (window.systems.weather?.currentDay) return;

    const $el = $slot("weather-details");
    window.systems.weather!.currentDay = $el?.innerHTML || null;

    const $hours = $slot("weather-hourly");
    if (!window.systems.weather!.initialHourly) {
      window.systems.weather!.initialHourly = $hours?.innerHTML || null;
    }
  },

  restoreCurrent: () => {
    if (!window.systems.weather?.currentDay) return;

    setHTML($slot("weather-details"), window.systems.weather.currentDay!);

    const $hoursSlot = $slot("weather-hourly");
    if ($hoursSlot && window.systems.weather.initialHourly) {
      setHTML($hoursSlot, window.systems.weather.initialHourly);
    }

    window.systems.weather?.setMode("current");
    window.systems.weather!.selectedHour = null;
    window.systems.weather!.selectedDate = null;
  },

  async setHour(datetime: string) {
    window.systems.weather?._saveCurrent();
    window.systems.weather!.selectedHour = datetime;
    window.systems.weather!.selectedDate = null;

    const hourHTML = await cacheHours.fetch(datetime, () =>
      fetch(`/_html/details/hour/${datetime}`).then((r) => r.text()),
    );

    setHTML($slot("weather-details"), hourHTML);
    window.systems.weather?.setMode("hour");
  },

  async setDate(date: string) {
    window.systems.weather?._saveCurrent();
    window.systems.weather!.selectedDate = date;
    window.systems.weather!.selectedHour = null;

    const dayHTML = await window.systems.loading.withLoading(
      cacheDays.fetch(date, () =>
        fetch(`/_html/details/day/${date}`).then((r) => r.text()),
      ),
    );

    setHTML($slot("weather-details"), dayHTML);

    const hoursHTML = await window.systems.loading.withLoading(
      cacheDayHourly.fetch(date, () =>
        fetch(`/_html/details/hours/${date}`).then((r) => r.text()),
      ),
    );

    setHTML($slot("weather-hourly"), hoursHTML);
    window.systems.weather?.setMode("day");
  },

  updateCachedTemperatures: (unit: "c" | "f") => {
    // Update all cached content
    [cacheHours, cacheDays, cacheDayHourly].forEach((cache) => {
      cache.keys().forEach((key) => {
        const cached = cache.get(key);
        if (cached) {
          cache.set(key, updateTemperaturesInHTML(cached, unit));
        }
      });
    });

    // Update saved current day and initial hourly
    if (window.systems.weather?.currentDay) {
      window.systems.weather.currentDay = updateTemperaturesInHTML(
        window.systems.weather.currentDay,
        unit,
      );
    }

    if (window.systems.weather?.initialHourly) {
      window.systems.weather.initialHourly = updateTemperaturesInHTML(
        window.systems.weather.initialHourly,
        unit,
      );
    }
  },

  _clearSelection: () => {
    // Remove selected class from all hour and day snippets
    const elements = [
      ...document.querySelectorAll('[data-slot="weather-hourly"] > div'),
      ...document.querySelectorAll('[data-slot="weather-days"] > div'),
    ];
    elements.forEach((el) => el.classList.remove("selected"));
  },

  _highlightSelected: () => {
    window.systems.weather?._clearSelection();

    if (window.systems.weather?.selectedHour) {
      const selectedHourElement = document.querySelector(
        `[data-slot="weather-hourly"] [data-time="${window.systems.weather.selectedHour}"]`,
      );
      selectedHourElement?.classList.add("selected");
    }

    if (window.systems.weather?.selectedDate) {
      const selectedDayElement = document.querySelector(
        `[data-slot="weather-days"] [data-date="${window.systems.weather.selectedDate}"]`,
      );
      selectedDayElement?.classList.add("selected");
    }
  },
});

// Initialize weather system
(function () {
  if (!window.systems?.weather) return;

  const root = $slot("weather-widget");
  if (!root) return;

  // Ensure initial mode and label
  window.systems.weather.setMode("current");

  // Remember initial hourly markup once
  if (!window.systems.weather.initialHourly) {
    const $hours = $slot("weather-hourly");
    window.systems.weather.initialHourly = $hours?.innerHTML || null;
  }

  // Event bindings (once per load)
  const hourly = root.querySelector('[data-slot="weather-hourly"]');
  if (hourly) {
    hourly.addEventListener(
      "click",
      function () {
        window.systems.weather!.setMode("hour");
        // Delay highlighting to ensure DOM is updated
        setTimeout(() => window.systems.weather?._highlightSelected(), 50);
      },
      { capture: true },
    );
  }

  const days = root.querySelector('[data-slot="weather-days"]');
  if (days) {
    days.addEventListener(
      "click",
      function () {
        window.systems.weather!.setMode("day");
        // Delay highlighting to ensure DOM is updated
        setTimeout(() => window.systems.weather?._highlightSelected(), 50);
      },
      { capture: true },
    );
  }
})();

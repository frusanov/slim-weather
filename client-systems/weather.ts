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

const cacheHours: Record<string, string> = {};
const cacheDays: Record<string, string> = {};
const cacheDayHourly: Record<string, string> = {};

/**
 * Update temperature displays in cached HTML strings
 */
function updateTemperaturesInHTML(html: string, unit: "c" | "f"): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const symbol = unit === "c" ? "°C" : "°F";

  const elements = doc.querySelectorAll("[data-temp-c][data-temp-f]");
  elements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const temp = unit === "c" ? el.dataset.tempC : el.dataset.tempF;
      if (temp) {
        el.textContent = temp + symbol;
      }
    }
  });

  return doc.body.innerHTML;
}

window.systems.weather = {
  currentDay: null,
  initialHourly: null,
  selectedHour: null,
  selectedDate: null,
  setMode(mode) {
    const root = document.querySelector(
      `[data-slot="weather-widget"]`,
    ) as HTMLElement | null;
    if (root) root.setAttribute("data-mode", mode);

    const label = document.querySelector(
      `[data-slot="mode-label"]`,
    ) as HTMLElement | null;
    if (label) {
      label.textContent =
        mode === "current"
          ? "Current Weather"
          : mode === "day"
            ? "Day Average"
            : "Hourly Forecast";
    }

    // Show undo icon only for day/hour modes
    const undoSvg = document.querySelector(
      `.lucide-undo-2, .lucide-undo2-icon`,
    ) as HTMLElement | null;
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

    const $el = window.document.querySelector(
      `[data-slot="weather-details"]`,
    ) as HTMLElement | null;
    window.systems.weather!.currentDay = $el?.innerHTML || null;

    const $hours = window.document.querySelector(
      `[data-slot="weather-hourly"]`,
    ) as HTMLElement | null;
    if (!window.systems.weather!.initialHourly) {
      window.systems.weather!.initialHourly = $hours?.innerHTML || null;
    }
  },
  restoreCurrent: () => {
    if (!window.systems.weather?.currentDay) return;

    const $el = window.document.querySelector(
      `[data-slot="weather-details"]`,
    ) as HTMLElement | null;

    if ($el) {
      $el.innerHTML = window.systems.weather.currentDay!;
    }

    const $hoursSlot = document.querySelector(
      `[data-slot="weather-hourly"]`,
    ) as HTMLElement | null;
    if ($hoursSlot && window.systems.weather.initialHourly) {
      $hoursSlot.innerHTML = window.systems.weather.initialHourly;
    }

    window.systems.weather?.setMode("current");
    window.systems.weather!.selectedHour = null;
    window.systems.weather!.selectedDate = null;
  },
  async setHour(datetime: string) {
    window.systems.weather?._saveCurrent();
    window.systems.weather!.selectedHour = datetime;
    window.systems.weather!.selectedDate = null;

    if (!cacheHours[datetime]) {
      const hourHTML = await fetch(`/_html/details/hour/${datetime}`).then(
        (r) => r.text(),
      );

      cacheHours[datetime] = hourHTML;
    }

    const $detailsSlot = document.querySelector(
      `[data-slot="weather-details"]`,
    ) as HTMLElement | null;

    if ($detailsSlot) {
      $detailsSlot.innerHTML = cacheHours[datetime];
    }

    window.systems.weather?.setMode("hour");
  },
  async setDate(date: string) {
    window.systems.weather?._saveCurrent();
    window.systems.weather!.selectedDate = date;
    window.systems.weather!.selectedHour = null;

    if (!cacheDays[date]) {
      const dayHTML = await window.systems.loading.withLoading(
        fetch(`/_html/details/day/${date}`).then((r) => r.text()),
      );

      cacheDays[date] = dayHTML;
    }

    const $detailsSlot = document.querySelector(
      `[data-slot="weather-details"]`,
    ) as HTMLElement | null;

    if ($detailsSlot) {
      $detailsSlot.innerHTML = cacheDays[date];
    }

    if (!cacheDayHourly[date]) {
      const hoursHTML = await window.systems.loading.withLoading(
        fetch(`/_html/details/hours/${date}`).then((r) => r.text()),
      );

      cacheDayHourly[date] = hoursHTML;
    }

    const $hoursSlot = document.querySelector(
      `[data-slot="weather-hourly"]`,
    ) as HTMLElement | null;

    if ($hoursSlot) {
      $hoursSlot.innerHTML = cacheDayHourly[date];
    }

    window.systems.weather?.setMode("day");
  },
  updateCachedTemperatures: (unit: "c" | "f") => {
    // Update cached hours
    Object.keys(cacheHours).forEach((key) => {
      if (cacheHours[key]) {
        cacheHours[key] = updateTemperaturesInHTML(cacheHours[key], unit);
      }
    });

    // Update cached days
    Object.keys(cacheDays).forEach((key) => {
      if (cacheDays[key]) {
        cacheDays[key] = updateTemperaturesInHTML(cacheDays[key], unit);
      }
    });

    // Update cached day hourly
    Object.keys(cacheDayHourly).forEach((key) => {
      if (cacheDayHourly[key]) {
        cacheDayHourly[key] = updateTemperaturesInHTML(
          cacheDayHourly[key],
          unit,
        );
      }
    });

    // Update saved current day if it exists
    if (window.systems.weather?.currentDay) {
      window.systems.weather.currentDay = updateTemperaturesInHTML(
        window.systems.weather.currentDay,
        unit,
      );
    }

    // Update saved initial hourly if it exists
    if (window.systems.weather?.initialHourly) {
      window.systems.weather.initialHourly = updateTemperaturesInHTML(
        window.systems.weather.initialHourly,
        unit,
      );
    }
  },
  _clearSelection: () => {
    // Remove selected class from all hour snippets
    const hourElements = document.querySelectorAll(
      '[data-slot="weather-hourly"] > div',
    );
    hourElements.forEach((el) => el.classList.remove("selected"));

    // Remove selected class from all day snippets
    const dayElements = document.querySelectorAll(
      '[data-slot="weather-days"] > div',
    );
    dayElements.forEach((el) => el.classList.remove("selected"));
  },
  _highlightSelected: () => {
    window.systems.weather?._clearSelection();

    if (window.systems.weather?.selectedHour) {
      // Find and highlight the selected hour using data-time attribute
      const selectedHourElement = document.querySelector(
        `[data-slot="weather-hourly"] [data-time="${window.systems.weather.selectedHour}"]`,
      );
      if (selectedHourElement) {
        selectedHourElement.classList.add("selected");
      }
    }

    if (window.systems.weather?.selectedDate) {
      // Find and highlight the selected day using data-date attribute
      const selectedDayElement = document.querySelector(
        `[data-slot="weather-days"] [data-date="${window.systems.weather.selectedDate}"]`,
      );
      if (selectedDayElement) {
        selectedDayElement.classList.add("selected");
      }
    }
  },
};

(function () {
  if (!window.systems || !window.systems.weather) return;

  const root = document.querySelector(
    '[data-slot="weather-widget"]',
  ) as HTMLElement | null;
  if (!root) return;

  // Ensure initial mode and label
  window.systems.weather!.setMode("current");

  // Remember initial hourly markup once
  if (!window.systems.weather!.initialHourly) {
    const $hours = document.querySelector(
      `[data-slot="weather-hourly"]`,
    ) as HTMLElement | null;
    window.systems.weather!.initialHourly = $hours?.innerHTML || null;
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

declare module "@/types/client" {
  interface Systems {
    weather?: {
      currentDay: string | null;
      initialHourly: string | null;
      setHour: (datetime: string) => Promise<void>;
      setDate: (date: string) => Promise<void>;
      _saveCurrent: () => void;
      restoreCurrent: () => void;
      setMode: (mode: "current" | "day" | "hour") => void;
    };
  }
}

const cacheHours: Record<string, string> = {};
const cacheDays: Record<string, string> = {};
const cacheDayHourly: Record<string, string> = {};

const backIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVuZG8yLWljb24gbHVjaWRlLXVuZG8tMiI+PHBhdGggZD0iTTkgMTQgNCA5bDUtNSIvPjxwYXRoIGQ9Ik00IDloMTAuNWE1LjUgNS41IDAgMCAxIDUuNSA1LjVhNS41IDUuNSAwIDAgMS01LjUgNS41SDExIi8+PC9zdmc+`;

window.systems.weather = {
  currentDay: null,
  initialHourly: null,
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
  },
  async setHour(datetime: string) {
    window.systems.weather?._saveCurrent();

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
      },
      { capture: true },
    );
  }
})();

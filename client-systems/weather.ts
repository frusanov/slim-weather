declare module "@/types/client" {
  interface Systems {
    weather?: {
      currentDay: string | null;
      setHour: (datetime: string) => Promise<void>;
      setDate: (date: string) => Promise<void>;
      _saveCurrent: () => void;
      restoreCurrent: () => void;
    };
  }
}

const cacheHours: Record<string, string> = {};
const cacheDays: Record<string, string> = {};

const backIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVuZG8yLWljb24gbHVjaWRlLXVuZG8tMiI+PHBhdGggZD0iTTkgMTQgNCA5bDUtNSIvPjxwYXRoIGQ9Ik00IDloMTAuNWE1LjUgNS41IDAgMCAxIDUuNSA1LjVhNS41IDUuNSAwIDAgMS01LjUgNS41SDExIi8+PC9zdmc+`;

window.systems.weather = {
  currentDay: null,
  _saveCurrent: () => {
    if (window.systems.weather?.currentDay) return;

    const $el = window.document.querySelector(`[data-slot="weather-details"]`);
    window.systems.weather!.currentDay = $el?.innerHTML || null;
  },
  restoreCurrent: () => {
    if (!window.systems.weather?.currentDay) return;

    const $el = window.document.querySelector(`[data-slot="weather-details"]`);

    if ($el) {
      $el.innerHTML = window.systems.weather.currentDay;
    }
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
    );

    if ($detailsSlot) {
      $detailsSlot.innerHTML = cacheHours[datetime];
    }
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
    );

    if ($detailsSlot) {
      $detailsSlot.innerHTML = cacheDays[date];
    }
  },
};

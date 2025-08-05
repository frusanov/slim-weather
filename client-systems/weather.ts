import type { APIResponseMap } from "../types/weather-api";

type Day = APIResponseMap["forecast.json"]["forecast"]["forecastday"][number];

const cacheHours: Record<string, string> = {};
const cacheDays: Record<string, string> = {};

window.systems.weather = {
  async setHour(datetime: string) {
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
    if (!cacheDays[date]) {
      const dayHTML = await fetch(`/_html/details/day/${date}`).then((r) =>
        r.text(),
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

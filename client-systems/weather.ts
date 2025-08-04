import type { APIResponseMap } from "../types/weather-api";

type Day = APIResponseMap["forecast.json"]["forecast"]["forecastday"][number];

const cache: Record<string, Day> = {};

window.systems.weather = {
  async setHour(hour: string) {
    console.log({ hour });
  },
  async setDate(date: string) {
    console.log({ date });
    const slotsToFill = [
      "temp_c",
      "humidity",
      "wind_kph",
      "pressure_mb",
      "vis_km",
      "uv",
      "cloud",
      "precip_mm",
    ];

    if (!cache[date]) {
      const day = (await fetch(`/api/day?date=${date}`).then((res) =>
        res.json(),
      )) as Day;

      cache[date] = day;
    }

    const $elementsWithSlots = document.querySelectorAll(
      `[data-slot]`,
    ) as Array<HTMLElement>;

    const draft = {};

    Array.from($elementsWithSlots).forEach(($el: HTMLElement) => {
      // console.log("$el.dataset.slot", $el.dataset.slot);

      $el.dataset.slot.split(",").map((s) => {
        const slot = s.trim();
        draft[slot] = $el;
      });
    });

    console.log({ draft });

    Object.entries(draft).forEach(([slot, $el]) => {
      if (cache[date].day[slot]) {
        $el.innerText = cache[date].day[slot];
      }
    });
  },
};

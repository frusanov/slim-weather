import type { FC } from "hono/jsx";
import type { ForecastDay } from "../../types/weather-api";
import { css } from "@emotion/css";
import type { UserPreferences } from "../../types/preferences";
import { getTemperatureWithPreferences } from "../../utils/preferences/format-weather";

export const DaySnippet: FC<{
  day: ForecastDay;
  preferences?: UserPreferences;
}> = ({ day, preferences = { temperatureUnit: "c" } }) => {
  const temperature = getTemperatureWithPreferences(
    day.day.maxtemp_c,
    day.day.maxtemp_f,
    preferences,
  );
  const tempSymbol = preferences.temperatureUnit === "f" ? "°F" : "°C";
  return (
    <div
      class={css`
        padding: 1rem;
        border-right: 2px solid #fff;
        font-size: 1rem;

        cursor: pointer;

        &:first-child,
        &:hover {
          background-color: #1f1f1f;
        }

        &:last-child {
          border-right: none;
        }
      `}
      data-date={day.date}
      data-maxtemp-c={day.day.maxtemp_c}
      data-maxtemp-f={day.day.maxtemp_f}
      onclick={`loadSystem("weather").then(() => window.systems.weather.setDate("${day.date}"))`}
    >
      {day.date}
      <br />
      UV: {day.day.uv}
      <br />
      Temp: {Math.round(temperature)}
      {tempSymbol}
      <br />
      {day.day.condition.text}
    </div>
  );
};

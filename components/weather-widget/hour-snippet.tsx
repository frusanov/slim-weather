import type { FC } from "hono/jsx";
import type { ForecastDay, Hour } from "../../types/weather-api";
import { css } from "@emotion/css";
import type { UserPreferences } from "../../types/preferences";
import { getTemperatureWithPreferences } from "../../utils/preferences/format-weather";

export const HourSnippet: FC<{
  hour: Hour;
  preferences?: UserPreferences;
}> = ({ hour, preferences = { temperatureUnit: "c" } }) => {
  const temperature = getTemperatureWithPreferences(
    hour.temp_c,
    hour.temp_f,
    preferences,
  );
  const tempSymbol = preferences.temperatureUnit === "f" ? "°F" : "°C";

  return (
    <div
      class={css`
        background-color: #222;
        padding: 1rem;
        border-radius: 1rem;
      `}
      onclick={`loadSystem("weather").then(() => window.systems.weather.setHour("${hour.time}"))`}
      data-temp-c={hour.temp_c}
      data-temp-f={hour.temp_f}
    >
      {hour.time.split(" ")[1]} {Math.round(temperature)}
      {tempSymbol} {hour.condition.text}
    </div>
  );
};

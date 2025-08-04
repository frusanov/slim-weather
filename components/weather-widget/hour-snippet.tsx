import type { FC } from "hono/jsx";
import type { ForecastDay, Hour } from "../../types/weather-api";
import { css } from "@emotion/css";

export const HourSnippet: FC<{ hour: Hour }> = ({ hour }) => {
  return (
    <div
      class={css`
        background-color: #222;
        padding: 1rem;
        border-radius: 1rem;
      `}
      onclick={`loadSystem("weather").then(() => window.systems.weather.setHour("${hour.time}"))`}
    >
      {hour.time.split(" ")[1]} {hour.temp_c} {hour.condition.text}
    </div>
  );
};

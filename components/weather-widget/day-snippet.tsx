import type { FC } from "hono/jsx";
import type { ForecastDay } from "../../types/weather-api";
import { css } from "@emotion/css";

export const DaySnippet: FC<{ day: ForecastDay }> = ({ day }) => {
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
      onclick={`loadSystem("weather").then(() => window.systems.weather.setDate("${day.date}"))`}
    >
      {day.date}
      <br />
      UV: {day.day.uv}
      <br />
      Temp: {day.day.maxtemp_c}
      <br />
      {day.day.condition.text}
    </div>
  );
};

import type { FC } from "hono/jsx";
import { css, cx } from "@emotion/css";
import type { APIResponseMap, ForecastDay } from "../../types/weather-api";
import { DaySnippet } from "./day-snippet.js";
import { HourSnippet } from "./hour-snippet.js";
import { WeatherDetails } from "./weather-details";
import { formatWeatherData } from "@/utils/format-weather";
import { noScrollbar } from "@/styles/mixins/no-scrollbar";

export const WeatherWidget: FC<{
  weather: APIResponseMap["forecast.json"];
}> = ({ weather }) => {
  const currentDay = weather.forecast.forecastday[0] as ForecastDay;

  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 2px solid #cccccc;
        border-radius: 2rem;
        font-size: 1.5rem;
        padding: 1.5rem;
        overflow: hidden;
        max-width: 600px;
      `}
    >
      <div
        class={css`
          font-size: 0.85rem;
        `}
        onclick={`loadSystem("location").then(() => window.systems.location.test())`}
      >
        📌 {weather.location.name}
      </div>

      <span data-slot="weather-details">
        <WeatherDetails
          weather={formatWeatherData(weather.current, "current")}
        />
      </span>

      <div
        class={cx(
          css`
            font-size: 0.85rem;
            display: flex;
            gap: 1rem;
            overflow-x: scroll;
            margin: 0 -1.5rem;
            padding: 0 1.5rem 0.5rem;
          `,
          noScrollbar,
        )}
      >
        {weather.forecast.forecastday[0]?.hour.map((hour) => {
          return <HourSnippet hour={hour} />;
        })}
      </div>

      <div
        class={cx(
          css`
            display: flex;
            margin: 0 -1.5rem -1.5rem;
            border-top: 2px solid #fff;
            overflow-x: scroll;
          `,
          noScrollbar,
        )}
      >
        {weather.forecast.forecastday.map((day) => {
          return <DaySnippet day={day} />;
        })}
      </div>
    </div>
  );
};

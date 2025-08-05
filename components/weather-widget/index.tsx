import type { FC } from "hono/jsx";
import { css, cx } from "@emotion/css";
import type { APIResponseMap, ForecastDay } from "../../types/weather-api";
import { DaySnippet } from "./day-snippet.js";
import { HourSnippet } from "./hour-snippet.js";
import { WeatherDetails } from "./weather-details";
import { formatWeatherData } from "@/utils/format-weather";
import { noScrollbar } from "@/styles/mixins/no-scrollbar";
import { TemperatureToggle } from "../temperature-toggle.js";
import { UserPreferences } from "@/types/preferences";
import { usePreferences } from "../preferences-context";

export const WeatherWidget: FC<{
  weather: APIResponseMap["forecast.json"];
}> = ({ weather }) => {
  const currentDay = weather.forecast.forecastday[0] as ForecastDay;

  const preferences = usePreferences();

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

        transition: all 0.3s ease-in-out;

        &.disabled {
          pointer-events: none;
          opacity: 0.75;
          filter: blur(5px);
        }
      `}
      data-slot="weather-widget"
    >
      <div
        class={css`
          font-size: 0.85rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div
          onclick={`loadSystem("location").then(() => window.systems.location.test())`}
        >
          📌 {weather.location.name}
        </div>

        <div
          onclick={`loadSystem("weather").then(() => window.systems.weather.restoreCurrent())`}
        >
          Restore
        </div>

        <TemperatureToggle />
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
        data-slot="weather-hourly"
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

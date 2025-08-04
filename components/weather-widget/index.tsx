import type { FC } from "hono/jsx";
import { css } from "@emotion/css";
import type { APIResponseMap, ForecastDay } from "../../types/weather-api";
import { DaySnippet } from "./day-snippet.js";
import { HourSnippet } from "./hour-snippet.js";

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
      {/*<pre>{JSON.stringify(weather, null, 2)}</pre>*/}
      <div
        class={css`
          display: flex;
          gap: 1rem;
        `}
      >
        <div
          class={css`
            display: flex;
            flex-direction: column;
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

          <div
            class={css`
              font-size: 4rem;
              font-weight: bold;
            `}
          >
            <span data-slot="temp_c,avgtemp_c">{weather.current.temp_c}</span>°C
            ⛅ <br />
            <span data-slot="condition.text">
              {weather.current.condition.text}
            </span>
          </div>
        </div>

        <div
          class={css`
            font-size: 1rem;
          `}
          data-slot="weather-details"
        >
          <div>
            Humidity:{" "}
            <span data-slot="humidity,avghumidity">
              {weather.current.humidity}
            </span>
            %
          </div>
          <div>
            Wind Speed:{" "}
            <span data-slot="wind_kph,maxwind_kph">
              {weather.current.wind_kph}
            </span>{" "}
            km/h
          </div>
          <div>
            Pressure:{" "}
            <span data-slot="pressure_mb">{weather.current.pressure_mb}</span>{" "}
            hPa
          </div>
          <div>
            Visibility:{" "}
            <span data-slot="vis_km,avgvis_km">{weather.current.vis_km}</span>{" "}
            km
          </div>
          <div>
            UV Index: <span data-slot="uv">{weather.current.uv}</span>
          </div>
          <div>
            Cloud Cover: <span data-slot="cloud">{weather.current.cloud}</span>%
          </div>
          <div>
            Precipitation:{" "}
            <span data-slot="precip_mm,totalprecip_mm">
              {weather.current.precip_mm}
            </span>
            mm
          </div>
        </div>
      </div>

      <div
        class={css`
          font-size: 0.85rem;
          display: flex;
          gap: 1rem;
          overflow-x: scroll;
        `}
      >
        {weather.forecast.forecastday[0]?.hour.map((hour) => {
          return <HourSnippet hour={hour} />;
        })}
      </div>

      <div
        class={css`
          display: flex;
          margin: 0 -1.5rem -1.5rem;
          border-top: 2px solid #fff;
        `}
      >
        {weather.forecast.forecastday.map((day) => {
          return <DaySnippet day={day} />;
        })}
      </div>
    </div>
  );
};

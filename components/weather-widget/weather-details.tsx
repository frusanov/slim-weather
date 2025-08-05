import { CommonWeatherFormat } from "@/types/common";
import { css } from "@emotion/css";
import { FC } from "hono/jsx";

export const WeatherDetails: FC<{
  weather: CommonWeatherFormat;
}> = ({ weather }) => {
  return (
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
            font-size: 4rem;
            font-weight: bold;
          `}
        >
          <span data-slot="temperature_c">{weather.temperature_c}</span>°C ⛅{" "}
          <br />
          <span data-slot="condition.text">{weather.condition.text}</span>
        </div>
      </div>

      <div
        class={css`
          font-size: 1rem;
        `}
        data-slot="weather-details"
      >
        <div>
          Humidity: <span data-slot="humidity">{weather.humidity}</span>%
        </div>
        <div>
          Wind Speed:{" "}
          <span data-slot="wind_speed_kph">{weather.wind_speed_kph}</span> km/h
          {weather.wind_dir && <span> ({weather.wind_dir})</span>}
        </div>
        <div>
          Visibility:{" "}
          <span data-slot="visibility_km">{weather.visibility_km}</span> km
        </div>
        <div>
          UV Index: <span data-slot="uv">{weather.uv}</span>
        </div>
        <div>
          Precipitation:{" "}
          <span data-slot="precipitation_mm">{weather.precipitation_mm}</span>
          mm
        </div>
        {weather.feels_like_c && (
          <div>
            Feels like:{" "}
            <span data-slot="feels_like_c">{weather.feels_like_c}</span>°C
          </div>
        )}
        {weather.type === "current" && weather.time && (
          <div>Updated: {new Date(weather.time).toLocaleTimeString()}</div>
        )}
        {weather.type === "day" && weather.date && (
          <div>Date: {new Date(weather.date).toLocaleDateString()}</div>
        )}
      </div>
    </div>
  );
};

import { FC } from "hono/jsx";
import { CommonWeatherFormat } from "@/types/common";
import { css } from "@emotion/css";
import { getWeatherEmoji } from "@/utils/weather-emojis";
import { UserPreferences } from "@/types/preferences";
import { usePreferences } from "../preferences-context";
import { Temperature } from "../temperature";

export const WeatherDetails: FC<{
  weather: CommonWeatherFormat;
}> = ({ weather }) => {
  // const units = getUnitsForPreferences(preferences);
  const preferences = usePreferences();

  const isCelsius = preferences.temperature === "c";

  const temperature =
    preferences.temperature === "c"
      ? weather.temperature_c
      : weather.temperature_f;

  const feelsLike = isCelsius ? weather.feels_like_c : weather.feels_like_f;

  const windSpeed = isCelsius ? weather.wind_speed_kph : weather.wind_speed_mph;

  const visibility = isCelsius
    ? weather.visibility_km
    : weather.visibility_miles;

  const precipitation = isCelsius
    ? weather.precipitation_mm
    : weather.precipitation_in;

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
          <Temperature c={weather.temperature_c} f={weather.temperature_f} />
          {getWeatherEmoji(weather.condition.code)} <br />
          <span
            data-slot="condition.text"
            class={css`
              font-size: 1rem;
            `}
          >
            {weather.condition.text}
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
          Humidity: <span data-slot="humidity">{weather.humidity}</span>%
        </div>
        <div>
          Wind Speed:{" "}
          <span
            data-slot="wind_speed_kph"
            data-wind-kph={weather.wind_speed_kph}
            data-wind-mph={weather.wind_speed_mph}
          >
            {Math.round(windSpeed)}
          </span>{" "}
          {windSpeed}
          {weather.wind_dir && <span> ({weather.wind_dir})</span>}
        </div>
        <div>
          Visibility:{" "}
          <span
            data-slot="visibility_km"
            data-visibility-km={weather.visibility_km}
            data-visibility-miles={weather.visibility_miles}
          >
            {Math.round(visibility)}
          </span>{" "}
          {visibility}
        </div>
        <div>
          UV Index: <span data-slot="uv">{weather.uv}</span>
        </div>
        <div>
          Precipitation:{" "}
          <span
            data-slot="precipitation_mm"
            data-precipitation-mm={weather.precipitation_mm}
            data-precipitation-in={weather.precipitation_in}
          >
            {precipitation}
          </span>{" "}
          {precipitation}
        </div>
        {feelsLike !== undefined && (
          <div>
            Feels like:{" "}
            <Temperature
              c={weather.feels_like_c as number}
              f={weather.feels_like_f as number}
            />
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

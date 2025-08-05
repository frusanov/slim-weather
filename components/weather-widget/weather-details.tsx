import { CommonWeatherFormat } from "@/types/common";
import { css } from "@emotion/css";
import { FC } from "hono/jsx";
import type { UserPreferences } from "@/types/preferences";
import {
  formatTemperatureWithPreferences,
  getUnitsForPreferences,
  getTemperatureWithPreferences,
} from "@/utils/preferences/format-weather";

export const WeatherDetails: FC<{
  weather: CommonWeatherFormat;
  preferences?: UserPreferences;
}> = ({ weather, preferences = { temperatureUnit: "c" } }) => {
  const units = getUnitsForPreferences(preferences);
  const temperature = getTemperatureWithPreferences(
    weather.temperature_c,
    weather.temperature_f,
    preferences,
  );
  const feelsLike =
    weather.feels_like_c && weather.feels_like_f
      ? getTemperatureWithPreferences(
          weather.feels_like_c,
          weather.feels_like_f,
          preferences,
        )
      : undefined;
  const windSpeed =
    preferences.temperatureUnit === "f"
      ? weather.wind_speed_mph
      : weather.wind_speed_kph;
  const visibility =
    preferences.temperatureUnit === "f"
      ? weather.visibility_miles
      : weather.visibility_km;
  const precipitation =
    preferences.temperatureUnit === "f"
      ? weather.precipitation_in
      : weather.precipitation_mm;
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
          <span
            data-slot="temperature_c"
            data-temp-c={weather.temperature_c}
            data-temp-f={weather.temperature_f}
          >
            {Math.round(temperature)}
          </span>
          <span class="temp-unit">{units.temperature}</span> ⛅ <br />
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
          <span
            data-slot="wind_speed_kph"
            data-wind-kph={weather.wind_speed_kph}
            data-wind-mph={weather.wind_speed_mph}
          >
            {Math.round(windSpeed)}
          </span>{" "}
          {units.windSpeed}
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
          {units.visibility}
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
          {units.precipitation}
        </div>
        {feelsLike !== undefined && (
          <div>
            Feels like:{" "}
            <span
              data-slot="feels_like_c"
              data-feels-like-c={weather.feels_like_c}
              data-feels-like-f={weather.feels_like_f}
            >
              {Math.round(feelsLike)}
            </span>
            <span class="temp-unit">{units.temperature}</span>
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

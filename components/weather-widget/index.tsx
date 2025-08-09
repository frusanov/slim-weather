import type { FC } from "hono/jsx";

import { css, cx } from "@emotion/css";
import type { APIResponseMap, ForecastDay } from "../../types/weather-api";
import { DaySnippet } from "./day-snippet.js";
import { HourSnippet } from "./hour-snippet.js";
import { WeatherDetails } from "./weather-details";
import { formatWeatherData } from "@/utils/format-weather";
import { noScrollbar } from "@/styles/mixins/no-scrollbar";
import { TemperatureToggle } from "../temperature-toggle.js";
import { lowerThan } from "@/styles/mixins/breakpoints";
import { prefersColorScheme } from "@/styles/mixins/prefers-color-scheme";

export const WeatherWidget: FC<{
  weather: APIResponseMap["forecast.json"];
}> = ({ weather }) => {
  const { country, region, name } = weather.location;

  const location = `${country}, ${region === name ? name : `${region}, ${name}`}`;

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
        max-width: 640px;

        background: radial-gradient(circle at 59% 50%, #0000, #00000017);

        transition: all 0.3s ease-in-out;

        backdrop-filter: blur(50vw);

        ${prefersColorScheme("dark")} {
          border-color: #666;
          background: radial-gradient(circle at 59% 50%, #0000, #ffffff17);
        }

        /* Hide undo icon in current mode and show for day/hour modes */
        & .undo-icon {
          display: none;
        }
        &:not([data-mode="current"]) .undo-icon {
          display: flex;
        }

        &.disabled {
          pointer-events: none;
          opacity: 0.75;
          filter: blur(5px);
        }

        ${lowerThan(
          "sm",
          css`
            height: 100%;
          `,
        )}
      `}
      data-slot="weather-widget"
      data-mode="current"
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
        // onclick={`loadSystem("location").then(() => window.systems.location.open())`}
        >
          📌 {location}
        </div>

        <div
          class={css`
            border: 2px solid #ccc;
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            margin-left: 1rem;
            margin-right: auto;

            overflow: hidden;

            display: flex;
            align-items: center;

            ${prefersColorScheme("dark")} {
              border-color: #666;
            }
          `}
          onclick={`loadSystem("weather").then(() => window.systems.weather.restoreCurrent())`}
        >
          <div
            class={cx(
              css`
                border-right: 1px solid #ccc;
                margin: -0.5rem 0;
                margin-right: 0.5rem;
                padding-right: 0.5rem;

                display: flex;
                align-items: center;

                svg,
                img {
                  width: 1rem;
                  height: 1rem;
                }

                ${prefersColorScheme("dark")} {
                  border-right-color: #666;
                }
              `,
              "undo-icon",
            )}
          >
            <button
              class={css`
                background: transparent;
                margin-left: -0.5rem;
                margin-right: -0.5rem;
                border: none;
                color: currentColor;
                padding: 0.25rem 0.5rem;

                cursor: pointer;

                transition: background-color 0.2s ease-in-out;

                &:hover {
                  background-color: rgba(0, 0, 0, 0.1);
                }

                ${prefersColorScheme("dark")} {
                  &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                  }
                }
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-undo2-icon lucide-undo-2"
              >
                <path d="M9 14 4 9l5-5" />
                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
              </svg>
            </button>
          </div>
          <span data-slot="mode-label">Current Weather</span>
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
            margin-top: auto;
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
            border-top: 2px solid #ccc;
            overflow-x: scroll;
            min-width: 120px;

            ${prefersColorScheme("dark")} {
              border-top-color: #666;
            }
          `,
          noScrollbar,
        )}
        data-slot="weather-days"
      >
        {weather.forecast.forecastday.map((day) => {
          return <DaySnippet day={day} />;
        })}
      </div>
    </div>
  );
};

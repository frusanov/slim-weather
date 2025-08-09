import type { FC } from "hono/jsx";
import type { ForecastDay, Hour } from "../../types/weather-api";
import { css } from "@emotion/css";
import { UserPreferences } from "@/types/preferences";
import { Temperature } from "../temperature";
import { getWeatherEmoji } from "@/utils/weather-emojis";
import { prefersColorScheme } from "@/styles/mixins/prefers-color-scheme";

export const HourSnippet: FC<{
  hour: Hour;
}> = ({ hour }) => {
  return (
    <div
      class={css`
        background-color: #edf9f9;
        padding: 1rem;
        border-radius: 1rem;
        cursor: pointer;

        ${prefersColorScheme("dark")} {
          background-color: #222;
        }

        &.selected {
          background-color: #0066cc;
          color: white;
        }
      `}
      data-time={hour.time}
      onclick={`loadSystem("weather").then(() => window.systems.weather.setHour("${hour.time}"))`}
    >
      <div
        class={css`
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        `}
      >
        <div
          class={css`
            position: absolute;
            top: -0.75rem;
            right: -0.75rem;
            font-size: 2rem;
            opacity: 0.5;
          `}
        >
          {getWeatherEmoji(hour.condition.code)}
        </div>

        <div
          class={css`
            font-size: 0.85rem;
          `}
        >
          {hour.time.split(" ")[1]}
        </div>
        <Temperature c={hour.temp_c} f={hour.temp_f} />
      </div>
    </div>
  );
};

import type { FC } from "hono/jsx";
import type { ForecastDay } from "../../types/weather-api";
import { css } from "@emotion/css";
import { UserPreferences } from "@/types/preferences";
import { Temperature } from "../temperature";
import { getWeatherEmoji } from "@/utils/weather-emojis";
import { format, fromUnixTime, parseISO } from "date-fns";

export const DaySnippet: FC<{
  day: ForecastDay;
}> = ({ day }) => {
  return (
    <div
      class={css`
        padding: 1rem;
        border-right: 2px solid #fff;
        font-size: 1rem;

        width: 100%;
        min-width: 55px;

        box-sizing: content-box;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        cursor: pointer;

        &:first-child,
        &:hover {
          background-color: #1f1f1f;
        }

        &:last-child {
          border-right: none;
        }
      `}
      onclick={`loadSystem("weather").then(() => window.systems.weather.setDate("${day.date}"))`}
    >
      {format(fromUnixTime(day.date_epoch), "dd EEE")}

      <div
        class={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        `}
      >
        <div
          class={css`
            font-size: 2rem;
          `}
        >
          {getWeatherEmoji(day.day.condition.code)}
        </div>
        <Temperature c={day.day.avgtemp_c} f={day.day.avgtemp_f} />
      </div>
    </div>
  );
};

import type { FC } from "hono/jsx";
import { css } from "@emotion/css";
import { UserPreferences } from "@/types/preferences";
import { usePreferences } from "./preferences-context";

export const TemperatureToggle: FC = () => {
  const preferences = usePreferences();
  const isMetric = preferences.temperature === "c";

  return (
    <button
      class={css`
        background: none;
        border: 2px solid #ccc;
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        color: inherit;
        position: relative;
        overflow: hidden;
        min-width: 80px;
        transition: all 0.2s ease;

        &:hover {
          border-color: #999;
          background-color: rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          border-color: #666;

          &:hover {
            border-color: #999;
            background-color: rgba(255, 255, 255, 0.05);
          }
        }

        &:active {
          transform: scale(0.98);
        }
      `}
      onclick="loadSystem('preferences').then(() => window.systems.preferences.toggleTemperatureUnit())"
      title="Toggle between Celsius and Fahrenheit"
      data-temp-unit={preferences.temperature}
    >
      <span
        class={css`
          display: inline-block;
          transition: opacity 0.15s ease;
        `}
        data-slot="temp-toggle-symbol"
      >
        {isMetric ? "°C" : "°F"}
      </span>

      {/* No inline script needed - using loadSystem pattern */}
    </button>
  );
};

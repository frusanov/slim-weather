import type { FC } from "hono/jsx";
import { css } from "@emotion/css";
import type { UserPreferences } from "../types/preferences.js";
import { html } from "hono/html";

export const TemperatureToggle: FC<{
  preferences: UserPreferences;
}> = ({ preferences }) => {
  const isMetric = preferences.temperatureUnit === "c";

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
      onclick="toggleTemperatureUnit()"
      title="Toggle between Celsius and Fahrenheit"
      data-temp-unit={preferences.temperatureUnit}
    >
      <span
        class={css`
          display: inline-block;
          transition: opacity 0.15s ease;
        `}
      >
        {isMetric ? "°C" : "°F"}
      </span>

      {html`
        <script>
          function toggleTemperatureUnit() {
            console.log("toggleTemperatureUnit");
            // Use preferences system if available
            if (window.systems && window.systems.preferences) {
              const current = window.systems.preferences.get();
              const newUnit = current.temperatureUnit === "c" ? "f" : "c";
              window.systems.preferences.setTemperatureUnit(newUnit);

              // Update the button display
              const button = document.querySelector("[data-temp-unit]");
              if (button) {
                button.setAttribute("data-temp-unit", newUnit);
                const span = button.querySelector("span");
                if (span) {
                  span.textContent = newUnit === "c" ? "°C" : "°F";
                }
              }
            } else {
              // Fallback: make API call
              fetch("/api/preferences/toggle-temperature", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    // Reload page to reflect changes
                    window.location.reload();
                  }
                })
                .catch((error) => {
                  console.error("Failed to toggle temperature unit:", error);
                });
            }
          }
        </script>
      `}
    </button>
  );
};

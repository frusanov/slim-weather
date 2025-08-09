import { Hono } from "hono";
import { PreferencesProvider } from "@/components/preferences-context";
import { WeatherDetails } from "@/components/weather-widget/weather-details";
import { formatWeatherData } from "@/utils/format-weather";
import { css } from "@emotion/css";
import { extractCritical } from "@emotion/server";
import { html } from "hono/html";

export const locationRoute = new Hono();

locationRoute.get(`/`, async (c) => {
  // c.cacheHeaders.use();
  //
  //
  //

  const styles = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(50px);
    padding: 16px;
    z-index: 1000;

    .location-modal {
      border: 2px solid #ccc;
      padding: 1rem;
      border-radius: 2rem;

      width: 100%;
      max-width: 600px;
      min-height: 400px;

      .controls {
        display: flex;
        gap: 1rem;

        input,
        button {
          padding: 0.5rem;
          border: 2px solid #ccc;
          background-color: transparent;
          color: #fff;
          border-radius: 1rem;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease-in-out;

          &:focus {
            border-color: #007bff;
          }
        }

        input {
          width: 100%;
        }
      }
    }
  `;

  const critical = extractCritical(
    html` <div class="${styles}"></div>` as string,
  );

  return c.html(
    <PreferencesProvider preferences={c.preferences.data} noScript>
      <style>{critical.css}</style>
      <div class={styles}>
        <div class={"location-modal"}>
          <div class="controls">
            <input oninput="window.systems.location.handleInput(this);" />
            <button onclick="window.systems.location.close();">detect</button>
          </div>
        </div>
      </div>
    </PreferencesProvider>,
  );
});

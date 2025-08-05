import type { FC } from "hono/jsx";
import { css } from "@emotion/css";
import { Layout } from "../components/layout.js";
import { WeatherWidget } from "../components/weather-widget/index.js";
import { Hono } from "hono";
import { fetchWeather } from "../utils/fetch-weather.js";
import type { UserPreferences } from "../types/preferences.js";
import { getPreferences } from "../utils/preferences/server.js";

export const IndexPage: FC = ({ weather, preferences }) => {
  return (
    <Layout>
      <div
        class={css`
          width: 100vw;
          height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;

          & > div {
            max-width: 600px;
          }
        `}
      >
        <WeatherWidget weather={weather} preferences={preferences} />
      </div>
    </Layout>
  );
};

export const indexRoute = new Hono();

indexRoute.get("/", async (c) => {
  const weather = await fetchWeather("Izmir");
  const preferences = await getPreferences(c);
  return c.html(<IndexPage weather={weather} preferences={preferences} />);
});

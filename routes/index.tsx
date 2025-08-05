import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { css } from "@emotion/css";
import { Layout } from "../components/layout.js";
import { WeatherWidget } from "../components/weather-widget/index.js";
import { fetchWeather } from "../utils/fetch-weather.js";
import { _htmlRoute } from "./_html/index.js";
import { apiRoute } from "./api/index.js";
import { PreferencesProvider } from "@/components/preferences-context.js";

export const IndexPage: FC = ({ weather, preferences }) => {
  return (
    <Layout>
      <PreferencesProvider preferences={preferences}>
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
          <WeatherWidget weather={weather} />
        </div>
      </PreferencesProvider>
    </Layout>
  );
};

export const indexRoute = new Hono();

indexRoute.get("/", async (c) => {
  const weather = await fetchWeather("Izmir");
  return c.html(
    <IndexPage weather={weather} preferences={c.preferences.data} />,
  );
});

indexRoute.route("/_html", _htmlRoute);
indexRoute.route("/api", apiRoute);

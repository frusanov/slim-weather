import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { css, keyframes } from "@emotion/css";
import { Layout } from "../components/layout.js";
import { WeatherWidget } from "../components/weather-widget/index.js";
import { _htmlRoute } from "./_html/index.js";
import { apiRoute } from "./api/index.js";
import { PreferencesProvider } from "@/components/preferences-context.js";
import { prefersColorScheme } from "@/styles/mixins/prefers-color-scheme.js";

const blobing = keyframes`
  0%   { transform: scale(1)   translate(10px, -30px); }
  38%  { transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg); }
  40%  { transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg); }
  78%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
  80%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
  100% { transform: scale(1)   translate(10px, -30px); }
`;

export const IndexPage: FC = ({ weather, preferences }) => {
  return (
    <Layout>
      <PreferencesProvider preferences={preferences}>
        <div
          class={css`
            position: relative;

            width: 100vw;
            height: 100vh;
            padding: 1rem;
            overflow: hidden;

            display: flex;
            justify-content: center;
            align-items: center;

            background: radial-gradient(circle at 50% 50%, #fff, #10ddff12);

            & > div {
              max-width: 640px;
            }

            ${prefersColorScheme("dark")} {
              background: radial-gradient(circle at 50% 50%, #320b53c7, #000);
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
  c.cacheHeaders.use();

  return c.html(
    <IndexPage weather={c.weather} preferences={c.preferences.data} />,
  );
});

indexRoute.route("/_html", _htmlRoute);
indexRoute.route("/api", apiRoute);

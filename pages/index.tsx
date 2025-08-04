import type { FC } from "hono/jsx";
import { css } from "@emotion/css";
import { Layout } from "../components/layout";
import { WeatherWidget } from "../components/weather-widget";

export const IndexPage: FC = ({ weather }) => {
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
        <WeatherWidget weather={weather} />
      </div>
    </Layout>
  );
};

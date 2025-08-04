import { Hono } from "hono";
import { IndexPage, indexRoute } from "./pages/index.js";
import { compress } from "hono/compress";
import { fetchWeather } from "./utils/fetch-weather.js";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "hono/vercel";

const isVercel = Boolean(process.env.VERCEL_REGION);

const app = new Hono();

if (!isVercel) {
  app.use(compress());

  app.use(
    "/systems/*",
    serveStatic({
      root: "./public/",
    }),
  );
}

app.route("/", indexRoute);

app.get("/api/day", async (c) => {
  const date = c.req.query("date");

  console.log({ date });

  const weather = await fetchWeather("Izmir");

  const day = weather.forecast.forecastday.find((day) => day.date === date);

  if (!day) {
    return new Response("404", { status: 404 });
  }

  return c.json({
    ...day,
    hour: null,
  });
});

export default isVercel ? undefined : app;

const handler = async (req: Request) => {
  console.log(`${req.method}: ${req.url}`);
  return await handle(app)(req);
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;

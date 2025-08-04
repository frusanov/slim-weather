import { Hono } from "hono";
import { IndexPage } from "./pages";
import { compress } from "bun-compression";
import { fetchWeather } from "./utils/fetch-weather";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use(compress());

app.use(
  "/systems/*",
  serveStatic({
    root: "./dist/",
  }),
);

app.get("/api/day", async (c) => {
  const date = c.req.query("date");

  const weather = await fetchWeather("Izmir");

  const day = weather.forecast.forecastday.find((day) => day.date === date);

  if (!day) return new Response("404", { status: 404 });

  return c.json({
    ...day,
    hour: null,
  });
});

app.get("/", async (c) => {
  const weather = await fetchWeather("Izmir");
  return c.html(<IndexPage weather={weather} />);
});

app.get("/location", async (c) => {
  c.res.headers.set("Content-Type", "text/javascript");

  const res = new Response(`
    if (!window.systems) window.systems = {};
    window.systems.location = {
      test: () => {
        console.log("Test function called!");
      },
    };
  `);

  res.headers.set("Content-Type", "text/javascript");

  return res;
});

export default app;

// export const onRequest = handle(app);

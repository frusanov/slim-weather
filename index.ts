import { Hono } from "hono";
import { IndexPage, indexRoute } from "./routes/index.js";
import { compress } from "hono/compress";
import { fetchWeather } from "./utils/fetch-weather.js";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "hono/vercel";
import { detailsRoute } from "./routes/details.js";

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

app.route("/_html/details", detailsRoute);

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

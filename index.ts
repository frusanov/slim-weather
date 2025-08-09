import { Hono } from "hono";
import { indexRoute } from "./routes/index.js";
import { compress } from "hono/compress";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "hono/vercel";
import { preferencesMiddleware } from "./middleware/preferences.js";
import { locationMiddleware } from "./middleware/location.js";
import { weatherMiddleware } from "./middleware/weather.js";

const isVercel = Boolean(process.env.VERCEL_REGION);

const app = new Hono();

if (!isVercel) {
  let envPromise: Promise<unknown> | null = null;

  app.use(async (_, next) => {
    if (!envPromise) {
      envPromise = import("dotenv").then(({ config }) => {
        return config();
      });
    }

    await envPromise;

    await next();
  });

  app.use(compress());

  app.use(
    "/systems/*",
    serveStatic({
      root: "./public/",
    }),
  );
}

app.use(locationMiddleware);
app.use(weatherMiddleware);
app.use(preferencesMiddleware);

app.route("/", indexRoute);

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

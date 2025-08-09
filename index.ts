import { Hono } from "hono";
import { indexRoute } from "./routes/index.js";
import { compress } from "hono/compress";
import { geolocation } from "@vercel/functions";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "hono/vercel";
import { preferencesMiddleware } from "./middleware/preferences.js";
import { locationMiddleware } from "./middleware/location.js";

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

app.use(locationMiddleware);
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

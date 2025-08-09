import { fetchWeather } from "@/utils/fetch-weather";
import { type Geo, geolocation } from "@vercel/functions";
import { MiddlewareHandler } from "hono";

declare module "hono" {
  interface Context {
    weather: Awaited<ReturnType<typeof fetchWeather>>;
  }
}

export const weatherMiddleware: MiddlewareHandler = async (c, next) => {
  const lat = c.location.latitude;
  const lon = c.location.longitude;

  c.weather = await fetchWeather(`${lat},${lon}`);

  await next();
};

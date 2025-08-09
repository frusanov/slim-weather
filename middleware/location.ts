import { type Geo, geolocation } from "@vercel/functions";
import { MiddlewareHandler } from "hono";

declare module "hono" {
  interface Context {
    location: Geo;
  }
}

export const locationMiddleware: MiddlewareHandler = async (c, next) => {
  const location = geolocation(c.req.raw);

  // Use mock data for dev1 region
  if (location.region === "dev1") {
    c.location = {
      city: "Izmir",
      country: "TR",
      flag: "🇹🇷",
      region: "dev1",
      countryRegion: "35",
      latitude: "38.4237",
      longitude: "27.1428",
      postalCode: "35000",
    };
  } else {
    c.location = location;
  }

  await next();
};

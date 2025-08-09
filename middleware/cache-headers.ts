import { type Geo, geolocation } from "@vercel/functions";
import { MiddlewareHandler } from "hono";

declare module "hono" {
  interface Context {
    cacheHeaders: {
      use: () => void;
    };
  }
}

export const cacheHeadersMiddleware: MiddlewareHandler = async (c, next) => {
  c.cacheHeaders = {
    use: () => {
      c.header("Vercel-CDN-Cache-Control", "max-age=900");
      c.header("Cache-Control", "public, max-age=300");
      c.header(
        "Vary",
        "Cookie, X-Vercel-IP-Country, X-Vercel-IP-Country-Region, X-Vercel-IP-City",
      );
    },
  };

  await next();
};

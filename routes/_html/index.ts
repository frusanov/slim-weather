import { Hono } from "hono";
import { detailsRoute } from "./details";
import { locationRoute } from "./location";

export const _htmlRoute = new Hono();

_htmlRoute.route("/details", detailsRoute);
_htmlRoute.route("/location", locationRoute);

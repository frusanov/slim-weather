import { Hono } from "hono";
import { detailsRoute } from "./details";

export const _htmlRoute = new Hono();

_htmlRoute.route("/details", detailsRoute);

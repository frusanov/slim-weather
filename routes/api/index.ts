import { Hono } from "hono";
import { preferencesRoute } from "./preferences";

export const apiRoute = new Hono();

apiRoute.route("/preferences", preferencesRoute);

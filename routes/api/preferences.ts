import { preferencesSchema } from "@/validators/preferences";
import { Hono } from "hono";

export const preferencesRoute = new Hono();

preferencesRoute.post("/", async (c) => {
  const fromUser = await preferencesSchema.parseAsync(await c.req.json());
  c.preferences.update(fromUser);
  return c.json(c.preferences);
});

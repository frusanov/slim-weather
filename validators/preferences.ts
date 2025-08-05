import z from "zod";

export const preferencesSchema = z
  .object({
    temperature: z.union([z.literal("c"), z.literal("f")]),
  })
  .partial()
  .required();

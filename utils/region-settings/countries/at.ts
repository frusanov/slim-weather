import { UserPreferences } from "@/types/preferences";

export default {
  // Austria - Celsius
  "AT-1": { temperature: "c" }, // Burgenland
  "AT-2": { temperature: "c" }, // Carinthia
  "AT-3": { temperature: "c" }, // Lower Austria
  "AT-4": { temperature: "c" }, // Upper Austria
  "AT-5": { temperature: "c" }, // Salzburg
  "AT-6": { temperature: "c" }, // Styria
  "AT-7": { temperature: "c" }, // Tyrol
  "AT-8": { temperature: "c" }, // Vorarlberg
  "AT-9": { temperature: "c" }, // Vienna
} satisfies Record<string, UserPreferences>;

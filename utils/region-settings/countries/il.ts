import { UserPreferences } from "@/types/preferences";

export default {
  // Israel - Celsius
  "IL-D": { temperature: "c" }, // Southern District
  "IL-HA": { temperature: "c" }, // Haifa District
  "IL-JM": { temperature: "c" }, // Jerusalem District
  "IL-M": { temperature: "c" }, // Central District
  "IL-TA": { temperature: "c" }, // Tel Aviv District
  "IL-Z": { temperature: "c" }, // Northern District
} satisfies Record<string, UserPreferences>;

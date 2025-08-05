import type { RegionSettings } from "../index.js";

export default {
  // Ireland - Celsius
  "IE-C": { temperature: "c" }, // Connacht
  "IE-L": { temperature: "c" }, // Leinster
  "IE-M": { temperature: "c" }, // Munster
  "IE-U": { temperature: "c" }, // Ulster (part of Republic of Ireland)
} satisfies Record<string, RegionSettings>;

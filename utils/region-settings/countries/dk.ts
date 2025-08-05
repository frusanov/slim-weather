import type { RegionSettings } from "../index.js";

export default {
  // Denmark - Celsius
  "DK-84": { temperature: "c" }, // Capital Region
  "DK-82": { temperature: "c" }, // Central Denmark
  "DK-81": { temperature: "c" }, // North Denmark
  "DK-85": { temperature: "c" }, // Zealand
  "DK-83": { temperature: "c" }, // Southern Denmark
} satisfies Record<string, RegionSettings>;

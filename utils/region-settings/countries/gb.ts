import type { RegionSettings } from "../index.js";

export default {
  // United Kingdom - Celsius
  "GB-ENG": { temperature: "c" }, // England
  "GB-SCT": { temperature: "c" }, // Scotland
  "GB-WLS": { temperature: "c" }, // Wales
  "GB-NIR": { temperature: "c" }, // Northern Ireland
} satisfies Record<string, RegionSettings>;

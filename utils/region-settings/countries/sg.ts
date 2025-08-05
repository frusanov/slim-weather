import type { RegionSettings } from "../index.js";

export default {
  // Singapore - Celsius
  "SG-01": { temperature: "c" }, // Central Singapore
  "SG-02": { temperature: "c" }, // North East
  "SG-03": { temperature: "c" }, // North West
  "SG-04": { temperature: "c" }, // South East
  "SG-05": { temperature: "c" }, // South West
} satisfies Record<string, RegionSettings>;

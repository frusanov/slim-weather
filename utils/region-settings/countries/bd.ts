import type { RegionSettings } from "../index.js";

export default {
  // Bangladesh - Celsius
  "BD-A": { temperature: "c" }, // Barisal Division
  "BD-B": { temperature: "c" }, // Chittagong Division
  "BD-C": { temperature: "c" }, // Dhaka Division
  "BD-D": { temperature: "c" }, // Khulna Division
  "BD-E": { temperature: "c" }, // Rajshahi Division
  "BD-F": { temperature: "c" }, // Rangpur Division
  "BD-G": { temperature: "c" }, // Sylhet Division
  "BD-H": { temperature: "c" }, // Mymensingh Division
} satisfies Record<string, RegionSettings>;

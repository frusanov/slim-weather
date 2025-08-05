import type { RegionSettings } from "../index.js";

export default {
  // Greece - Celsius
  "GR-A": { temperature: "c" }, // Attica
  "GR-B": { temperature: "c" }, // Central Macedonia
  "GR-C": { temperature: "c" }, // Central Greece
  "GR-D": { temperature: "c" }, // Crete
  "GR-E": { temperature: "c" }, // East Macedonia and Thrace
  "GR-F": { temperature: "c" }, // Epirus
  "GR-G": { temperature: "c" }, // Ionian Islands
  "GR-H": { temperature: "c" }, // North Aegean
  "GR-I": { temperature: "c" }, // Peloponnese
  "GR-J": { temperature: "c" }, // South Aegean
  "GR-K": { temperature: "c" }, // Thessaly
  "GR-L": { temperature: "c" }, // West Greece
  "GR-M": { temperature: "c" }, // West Macedonia
} satisfies Record<string, RegionSettings>;

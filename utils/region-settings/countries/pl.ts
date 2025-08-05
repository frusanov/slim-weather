import { UserPreferences } from "@/types/preferences";

export default {
  // Poland - Celsius
  "PL-DS": { temperature: "c" }, // Lower Silesia
  "PL-KP": { temperature: "c" }, // Kuyavia-Pomerania
  "PL-LU": { temperature: "c" }, // Lublin
  "PL-LB": { temperature: "c" }, // Lubusz
  "PL-LD": { temperature: "c" }, // Łódź
  "PL-MA": { temperature: "c" }, // Lesser Poland
  "PL-MZ": { temperature: "c" }, // Masovia
  "PL-OP": { temperature: "c" }, // Opole
  "PL-PK": { temperature: "c" }, // Subcarpathia
  "PL-PD": { temperature: "c" }, // Podlaskie
  "PL-PM": { temperature: "c" }, // Pomerania
  "PL-SL": { temperature: "c" }, // Silesia
  "PL-SK": { temperature: "c" }, // Holy Cross
  "PL-WN": { temperature: "c" }, // Warmia-Masuria
  "PL-WP": { temperature: "c" }, // Greater Poland
  "PL-ZP": { temperature: "c" }, // West Pomerania
} satisfies Record<string, UserPreferences>;

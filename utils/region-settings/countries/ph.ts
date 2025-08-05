import { UserPreferences } from "@/types/preferences";

export default {
  // Philippines - Celsius
  "PH-00": { temperature: "c" }, // National Capital Region (Metro Manila)
  "PH-01": { temperature: "c" }, // Ilocos Region
  "PH-02": { temperature: "c" }, // Cagayan Valley
  "PH-03": { temperature: "c" }, // Central Luzon
  "PH-05": { temperature: "c" }, // Bicol Region
  "PH-06": { temperature: "c" }, // Western Visayas
  "PH-07": { temperature: "c" }, // Central Visayas
  "PH-08": { temperature: "c" }, // Eastern Visayas
  "PH-09": { temperature: "c" }, // Zamboanga Peninsula
  "PH-10": { temperature: "c" }, // Northern Mindanao
  "PH-11": { temperature: "c" }, // Davao Region
  "PH-12": { temperature: "c" }, // SOCCSKSARGEN
  "PH-13": { temperature: "c" }, // Caraga
  "PH-14": { temperature: "c" }, // Autonomous Region in Muslim Mindanao
  "PH-15": { temperature: "c" }, // Cordillera Administrative Region
  "PH-40": { temperature: "c" }, // CALABARZON
  "PH-41": { temperature: "c" }, // MIMAROPA
} satisfies Record<string, UserPreferences>;

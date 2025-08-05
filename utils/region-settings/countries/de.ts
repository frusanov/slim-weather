import type { RegionSettings } from "../index.js";

export default {
  // Germany - Celsius
  "DE-BW": { temperature: "c" }, // Baden-Württemberg
  "DE-BY": { temperature: "c" }, // Bavaria
  "DE-BE": { temperature: "c" }, // Berlin
  "DE-BB": { temperature: "c" }, // Brandenburg
  "DE-HB": { temperature: "c" }, // Bremen
  "DE-HH": { temperature: "c" }, // Hamburg
  "DE-HE": { temperature: "c" }, // Hesse
  "DE-MV": { temperature: "c" }, // Mecklenburg-Vorpommern
  "DE-NI": { temperature: "c" }, // Lower Saxony
  "DE-NW": { temperature: "c" }, // North Rhine-Westphalia
  "DE-RP": { temperature: "c" }, // Rhineland-Palatinate
  "DE-SL": { temperature: "c" }, // Saarland
  "DE-SN": { temperature: "c" }, // Saxony
  "DE-ST": { temperature: "c" }, // Saxony-Anhalt
  "DE-SH": { temperature: "c" }, // Schleswig-Holstein
  "DE-TH": { temperature: "c" }, // Thuringia
} satisfies Record<string, RegionSettings>;

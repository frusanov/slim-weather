import type { RegionSettings } from "../index.js";

export default {
  // Netherlands - Celsius
  "NL-DR": { temperature: "c" }, // Drenthe
  "NL-FL": { temperature: "c" }, // Flevoland
  "NL-FR": { temperature: "c" }, // Friesland
  "NL-GE": { temperature: "c" }, // Gelderland
  "NL-GR": { temperature: "c" }, // Groningen
  "NL-LI": { temperature: "c" }, // Limburg
  "NL-NB": { temperature: "c" }, // North Brabant
  "NL-NH": { temperature: "c" }, // North Holland
  "NL-OV": { temperature: "c" }, // Overijssel
  "NL-UT": { temperature: "c" }, // Utrecht
  "NL-ZE": { temperature: "c" }, // Zeeland
  "NL-ZH": { temperature: "c" }, // South Holland
} satisfies Record<string, RegionSettings>;

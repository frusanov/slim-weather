import type { RegionSettings } from "../index.js";

export default {
  // Czech Republic - Celsius
  "CZ-JC": { temperature: "c" }, // South Bohemia
  "CZ-JM": { temperature: "c" }, // South Moravia
  "CZ-KA": { temperature: "c" }, // Karlovy Vary
  "CZ-KR": { temperature: "c" }, // Kralovehradecky
  "CZ-LI": { temperature: "c" }, // Liberec
  "CZ-MO": { temperature: "c" }, // Moravian-Silesian
  "CZ-OL": { temperature: "c" }, // Olomouc
  "CZ-PA": { temperature: "c" }, // Pardubice
  "CZ-PL": { temperature: "c" }, // Plzen
  "CZ-PR": { temperature: "c" }, // Prague
  "CZ-ST": { temperature: "c" }, // Central Bohemia
  "CZ-US": { temperature: "c" }, // Usti nad Labem
  "CZ-VY": { temperature: "c" }, // Vysocina
  "CZ-ZL": { temperature: "c" }, // Zlin
} satisfies Record<string, RegionSettings>;

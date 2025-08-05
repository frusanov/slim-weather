import type { RegionSettings } from "../index.js";

export default {
  // Switzerland - Celsius
  "CH-AG": { temperature: "c" }, // Aargau
  "CH-AR": { temperature: "c" }, // Appenzell Ausserrhoden
  "CH-AI": { temperature: "c" }, // Appenzell Innerrhoden
  "CH-BL": { temperature: "c" }, // Basel-Landschaft
  "CH-BS": { temperature: "c" }, // Basel-Stadt
  "CH-BE": { temperature: "c" }, // Bern
  "CH-FR": { temperature: "c" }, // Fribourg
  "CH-GE": { temperature: "c" }, // Geneva
  "CH-GL": { temperature: "c" }, // Glarus
  "CH-GR": { temperature: "c" }, // Graubünden
  "CH-JU": { temperature: "c" }, // Jura
  "CH-LU": { temperature: "c" }, // Lucerne
  "CH-NE": { temperature: "c" }, // Neuchâtel
  "CH-NW": { temperature: "c" }, // Nidwalden
  "CH-OW": { temperature: "c" }, // Obwalden
  "CH-SG": { temperature: "c" }, // St. Gallen
  "CH-SH": { temperature: "c" }, // Schaffhausen
  "CH-SZ": { temperature: "c" }, // Schwyz
  "CH-SO": { temperature: "c" }, // Solothurn
  "CH-TG": { temperature: "c" }, // Thurgau
  "CH-TI": { temperature: "c" }, // Ticino
  "CH-UR": { temperature: "c" }, // Uri
  "CH-VD": { temperature: "c" }, // Vaud
  "CH-VS": { temperature: "c" }, // Valais
  "CH-ZG": { temperature: "c" }, // Zug
  "CH-ZH": { temperature: "c" }, // Zurich
} satisfies Record<string, RegionSettings>;

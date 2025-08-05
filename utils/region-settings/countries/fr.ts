import { UserPreferences } from "@/types/preferences";

export default {
  // France - Celsius
  "FR-ARA": { temperature: "c" }, // Auvergne-Rhône-Alpes
  "FR-BFC": { temperature: "c" }, // Bourgogne-Franche-Comté
  "FR-BRE": { temperature: "c" }, // Brittany
  "FR-CVL": { temperature: "c" }, // Centre-Val de Loire
  "FR-COR": { temperature: "c" }, // Corsica
  "FR-GES": { temperature: "c" }, // Grand Est
  "FR-HDF": { temperature: "c" }, // Hauts-de-France
  "FR-IDF": { temperature: "c" }, // Île-de-France
  "FR-NOR": { temperature: "c" }, // Normandy
  "FR-NAQ": { temperature: "c" }, // Nouvelle-Aquitaine
  "FR-OCC": { temperature: "c" }, // Occitanie
  "FR-PDL": { temperature: "c" }, // Pays de la Loire
  "FR-PAC": { temperature: "c" }, // Provence-Alpes-Côte d'Azur
} satisfies Record<string, UserPreferences>;

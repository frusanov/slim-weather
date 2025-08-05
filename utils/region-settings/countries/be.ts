import { UserPreferences } from "@/types/preferences";

export default {
  // Belgium - Celsius
  "BE-VAN": { temperature: "c" }, // Antwerp
  "BE-BRU": { temperature: "c" }, // Brussels
  "BE-VBR": { temperature: "c" }, // Flemish Brabant
  "BE-WHT": { temperature: "c" }, // Hainaut
  "BE-VLI": { temperature: "c" }, // Limburg
  "BE-VLG": { temperature: "c" }, // Liège
  "BE-VLX": { temperature: "c" }, // Luxembourg
  "BE-WNA": { temperature: "c" }, // Namur
  "BE-VOV": { temperature: "c" }, // East Flanders
  "BE-VWV": { temperature: "c" }, // West Flanders
  "BE-WBR": { temperature: "c" }, // Walloon Brabant
} satisfies Record<string, UserPreferences>;

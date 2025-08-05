import { UserPreferences } from "@/types/preferences";

export default {
  // New Zealand - Celsius
  "NZ-AUK": { temperature: "c" }, // Auckland
  "NZ-BOP": { temperature: "c" }, // Bay of Plenty
  "NZ-CAN": { temperature: "c" }, // Canterbury
  "NZ-GIS": { temperature: "c" }, // Gisborne
  "NZ-HKB": { temperature: "c" }, // Hawke's Bay
  "NZ-MWT": { temperature: "c" }, // Manawatu-Wanganui
  "NZ-MBH": { temperature: "c" }, // Marlborough
  "NZ-NSN": { temperature: "c" }, // Nelson
  "NZ-NTL": { temperature: "c" }, // Northland
  "NZ-OTA": { temperature: "c" }, // Otago
  "NZ-STL": { temperature: "c" }, // Southland
  "NZ-TKI": { temperature: "c" }, // Taranaki
  "NZ-TAS": { temperature: "c" }, // Tasman
  "NZ-WKO": { temperature: "c" }, // Waikato
  "NZ-WGN": { temperature: "c" }, // Wellington
  "NZ-WTC": { temperature: "c" }, // West Coast
} satisfies Record<string, UserPreferences>;

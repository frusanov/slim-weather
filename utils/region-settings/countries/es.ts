import type { RegionSettings } from "../index.js";

export default {
  // Spain - Celsius
  "ES-AN": { temperature: "c" }, // Andalusia
  "ES-AR": { temperature: "c" }, // Aragon
  "ES-AS": { temperature: "c" }, // Asturias
  "ES-IB": { temperature: "c" }, // Balearic Islands
  "ES-PV": { temperature: "c" }, // Basque Country
  "ES-CN": { temperature: "c" }, // Canary Islands
  "ES-CB": { temperature: "c" }, // Cantabria
  "ES-CM": { temperature: "c" }, // Castile-La Mancha
  "ES-CL": { temperature: "c" }, // Castile and León
  "ES-CT": { temperature: "c" }, // Catalonia
  "ES-EX": { temperature: "c" }, // Extremadura
  "ES-GA": { temperature: "c" }, // Galicia
  "ES-MD": { temperature: "c" }, // Madrid
  "ES-MC": { temperature: "c" }, // Murcia
  "ES-NC": { temperature: "c" }, // Navarre
  "ES-RI": { temperature: "c" }, // La Rioja
  "ES-VC": { temperature: "c" }, // Valencia
  "ES-CE": { temperature: "c" }, // Ceuta
  "ES-ML": { temperature: "c" }, // Melilla
} satisfies Record<string, RegionSettings>;

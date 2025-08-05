import { UserPreferences } from "@/types/preferences";

export default {
  // South Africa - Celsius
  "ZA-EC": { temperature: "c" }, // Eastern Cape
  "ZA-FS": { temperature: "c" }, // Free State
  "ZA-GP": { temperature: "c" }, // Gauteng
  "ZA-KZN": { temperature: "c" }, // KwaZulu-Natal
  "ZA-LP": { temperature: "c" }, // Limpopo
  "ZA-MP": { temperature: "c" }, // Mpumalanga
  "ZA-NC": { temperature: "c" }, // Northern Cape
  "ZA-NW": { temperature: "c" }, // North West
  "ZA-WC": { temperature: "c" }, // Western Cape
} satisfies Record<string, UserPreferences>;

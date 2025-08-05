import { UserPreferences } from "@/types/preferences";

export default {
  // Pakistan - Celsius
  "PK-BA": { temperature: "c" }, // Balochistan
  "PK-IS": { temperature: "c" }, // Islamabad Capital Territory
  "PK-JK": { temperature: "c" }, // Azad Jammu and Kashmir
  "PK-KP": { temperature: "c" }, // Khyber Pakhtunkhwa
  "PK-PB": { temperature: "c" }, // Punjab
  "PK-SD": { temperature: "c" }, // Sindh
  "PK-TA": { temperature: "c" }, // Federally Administered Tribal Areas
  "PK-GB": { temperature: "c" }, // Gilgit-Baltistan
} satisfies Record<string, UserPreferences>;

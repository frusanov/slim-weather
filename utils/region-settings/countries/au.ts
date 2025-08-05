import { UserPreferences } from "@/types/preferences";

export default {
  // Australia - Celsius
  "AU-NSW": { temperature: "c" }, // New South Wales
  "AU-QLD": { temperature: "c" }, // Queensland
  "AU-SA": { temperature: "c" }, // South Australia
  "AU-TAS": { temperature: "c" }, // Tasmania
  "AU-VIC": { temperature: "c" }, // Victoria
  "AU-WA": { temperature: "c" }, // Western Australia
  "AU-ACT": { temperature: "c" }, // Australian Capital Territory
  "AU-NT": { temperature: "c" }, // Northern Territory
} satisfies Record<string, UserPreferences>;

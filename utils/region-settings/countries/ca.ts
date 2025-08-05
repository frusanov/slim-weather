import { UserPreferences } from "@/types/preferences";

export default {
  // Canada - Celsius
  "CA-AB": { temperature: "c" }, // Alberta
  "CA-BC": { temperature: "c" }, // British Columbia
  "CA-MB": { temperature: "c" }, // Manitoba
  "CA-NB": { temperature: "c" }, // New Brunswick
  "CA-NL": { temperature: "c" }, // Newfoundland and Labrador
  "CA-NS": { temperature: "c" }, // Nova Scotia
  "CA-ON": { temperature: "c" }, // Ontario
  "CA-PE": { temperature: "c" }, // Prince Edward Island
  "CA-QC": { temperature: "c" }, // Quebec
  "CA-SK": { temperature: "c" }, // Saskatchewan
  "CA-NT": { temperature: "c" }, // Northwest Territories
  "CA-NU": { temperature: "c" }, // Nunavut
  "CA-YT": { temperature: "c" }, // Yukon
} satisfies Record<string, UserPreferences>;

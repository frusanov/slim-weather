import type { RegionSettings } from "../index.js";

export default {
  // Sweden - Celsius
  "SE-K": { temperature: "c" }, // Blekinge
  "SE-W": { temperature: "c" }, // Dalarna
  "SE-I": { temperature: "c" }, // Gotland
  "SE-X": { temperature: "c" }, // Gävleborg
  "SE-N": { temperature: "c" }, // Halland
  "SE-Z": { temperature: "c" }, // Jämtland
  "SE-F": { temperature: "c" }, // Jönköping
  "SE-H": { temperature: "c" }, // Kalmar
  "SE-G": { temperature: "c" }, // Kronoberg
  "SE-BD": { temperature: "c" }, // Norrbotten
  "SE-M": { temperature: "c" }, // Skåne
  "SE-AB": { temperature: "c" }, // Stockholm
  "SE-D": { temperature: "c" }, // Södermanland
  "SE-C": { temperature: "c" }, // Uppsala
  "SE-S": { temperature: "c" }, // Värmland
  "SE-AC": { temperature: "c" }, // Västerbotten
  "SE-Y": { temperature: "c" }, // Västernorrland
  "SE-U": { temperature: "c" }, // Västmanland
  "SE-O": { temperature: "c" }, // Västra Götaland
  "SE-T": { temperature: "c" }, // Örebro
  "SE-E": { temperature: "c" }, // Östergötland
} satisfies Record<string, RegionSettings>;

import type { RegionSettings } from "../index.js";

export default {
  // South Korea - Celsius
  "KR-26": { temperature: "c" }, // Busan
  "KR-27": { temperature: "c" }, // Daegu
  "KR-28": { temperature: "c" }, // Incheon
  "KR-29": { temperature: "c" }, // Gwangju
  "KR-30": { temperature: "c" }, // Daejeon
  "KR-31": { temperature: "c" }, // Ulsan
  "KR-41": { temperature: "c" }, // Gyeonggi
  "KR-42": { temperature: "c" }, // Gangwon
  "KR-43": { temperature: "c" }, // North Chungcheong
  "KR-44": { temperature: "c" }, // South Chungcheong
  "KR-45": { temperature: "c" }, // North Jeolla
  "KR-46": { temperature: "c" }, // South Jeolla
  "KR-47": { temperature: "c" }, // North Gyeongsang
  "KR-48": { temperature: "c" }, // South Gyeongsang
  "KR-49": { temperature: "c" }, // Jeju
  "KR-11": { temperature: "c" }, // Seoul
} satisfies Record<string, RegionSettings>;

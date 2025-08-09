import type { APIResponseMap } from "../types/weather-api";
import { Redis } from "@upstash/redis";

export const fetchWeather = async (
  q: string,
): Promise<APIResponseMap["forecast.json"]> => {
  const cacheKey = `weather:${q}`;

  const redis = Redis.fromEnv();

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return cached as APIResponseMap["forecast.json"];
    }
  } catch (error) {
    console.warn("Redis cache read failed:", error);
  }

  // Fetch fresh data from API
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API}&q=${q}&days=7`,
  );
  const data = (await response.json()) as APIResponseMap["forecast.json"];

  try {
    await redis.setex(cacheKey, 3600, data);
  } catch (error) {
    console.warn("Redis cache write failed:", error);
  }

  return data;
};

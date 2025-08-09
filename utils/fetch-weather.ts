import type { APIResponseMap } from "../types/weather-api";

export const fetchWeather = async (
  q: string,
): Promise<APIResponseMap["forecast.json"]> => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API}&q=${q}&days=7`,
  );
  const data = (await response.json()) as APIResponseMap["forecast.json"];
  return data;
};

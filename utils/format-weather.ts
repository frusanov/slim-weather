import { CommonWeatherFormat } from "@/types/common";
import { Current, Day, Hour } from "@/types/weather-api";

export function formatWeatherData(
  data: Current | Day | Hour,
  type: "current" | "day" | "hour",
): CommonWeatherFormat {
  const base = {
    condition: data.condition,
    uv: data.uv,
    air_quality: data.air_quality,
    type,
  };

  if (type === "current") {
    const current = data as Current;
    return {
      ...base,
      temperature_c: current.temp_c,
      temperature_f: current.temp_f,
      feels_like_c: current.feelslike_c,
      feels_like_f: current.feelslike_f,
      wind_speed_kph: current.wind_kph,
      wind_speed_mph: current.wind_mph,
      wind_direction: current.wind_degree,
      wind_dir: current.wind_dir,
      precipitation_mm: current.precip_mm,
      precipitation_in: current.precip_in,
      humidity: current.humidity,
      visibility_km: current.vis_km,
      visibility_miles: current.vis_miles,
    };
  }

  if (type === "day") {
    const day = data as Day;
    return {
      ...base,
      temperature_c: day.avgtemp_c,
      temperature_f: day.avgtemp_f,
      wind_speed_kph: day.maxwind_kph,
      wind_speed_mph: day.maxwind_mph,
      precipitation_mm: day.totalprecip_mm,
      precipitation_in: day.totalprecip_in,
      humidity: day.avghumidity,
      visibility_km: day.avgvis_km,
      visibility_miles: day.avgvis_miles,
    };
  }

  if (type === "hour") {
    const hour = data as Hour;
    return {
      ...base,
      temperature_c: hour.temp_c,
      temperature_f: hour.temp_f,
      feels_like_c: hour.feelslike_c,
      feels_like_f: hour.feelslike_f,
      wind_speed_kph: hour.wind_kph,
      wind_speed_mph: hour.wind_mph,
      wind_direction: hour.wind_degree,
      wind_dir: hour.wind_dir,
      precipitation_mm: hour.precip_mm,
      precipitation_in: hour.precip_in,
      humidity: hour.humidity,
      visibility_km: hour.vis_km,
      visibility_miles: hour.vis_miles,
      time: hour.time,
    };
  }

  throw new Error(`Unsupported weather data type: ${type}`);
}

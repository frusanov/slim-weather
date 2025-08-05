/**
 * Weather condition code to emoji mapping based on WeatherAPI.com conditions
 * Optimized for minimal bundle size with day/night variations
 */

interface EmojiConfig {
  default: string;
  night?: string;
}

export const weatherEmojis: Record<number, EmojiConfig> = {
  // Clear/Sunny
  1000: { default: "☀️", night: "🌙" },

  // Cloudy conditions
  1003: { default: "⛅" }, // Partly cloudy
  1006: { default: "☁️" }, // Cloudy
  1009: { default: "☁️" }, // Overcast

  // Mist/Fog
  1030: { default: "🌫️" }, // Mist
  1135: { default: "🌫️" }, // Fog
  1147: { default: "🌫️" }, // Freezing fog

  // Rain conditions
  1063: { default: "🌦️" }, // Patchy rain possible
  1087: { default: "⛈️" }, // Thundery outbreaks possible
  1150: { default: "🌦️" }, // Patchy light drizzle
  1153: { default: "🌦️" }, // Light drizzle
  1168: { default: "🌦️" }, // Freezing drizzle
  1171: { default: "🌦️" }, // Heavy freezing drizzle
  1180: { default: "🌦️" }, // Patchy light rain
  1183: { default: "🌧️" }, // Light rain
  1186: { default: "🌧️" }, // Moderate rain at times
  1189: { default: "🌧️" }, // Moderate rain
  1192: { default: "🌧️" }, // Heavy rain at times
  1195: { default: "🌧️" }, // Heavy rain
  1198: { default: "🌧️" }, // Light freezing rain
  1201: { default: "🌧️" }, // Moderate or heavy freezing rain
  1240: { default: "🌦️" }, // Light rain shower
  1243: { default: "🌧️" }, // Moderate or heavy rain shower
  1246: { default: "🌧️" }, // Torrential rain shower
  1273: { default: "⛈️" }, // Patchy light rain with thunder
  1276: { default: "⛈️" }, // Moderate or heavy rain with thunder

  // Snow conditions
  1066: { default: "🌨️" }, // Patchy snow possible
  1069: { default: "🌨️" }, // Patchy sleet possible
  1072: { default: "🌨️" }, // Patchy freezing drizzle possible
  1114: { default: "❄️" }, // Blowing snow
  1117: { default: "❄️" }, // Blizzard
  1204: { default: "🌨️" }, // Light sleet
  1207: { default: "🌨️" }, // Moderate or heavy sleet
  1210: { default: "🌨️" }, // Patchy light snow
  1213: { default: "❄️" }, // Light snow
  1216: { default: "❄️" }, // Patchy moderate snow
  1219: { default: "❄️" }, // Moderate snow
  1222: { default: "❄️" }, // Patchy heavy snow
  1225: { default: "❄️" }, // Heavy snow
  1237: { default: "🧊" }, // Ice pellets
  1249: { default: "🌨️" }, // Light sleet showers
  1252: { default: "🌨️" }, // Moderate or heavy sleet showers
  1255: { default: "🌨️" }, // Light snow showers
  1258: { default: "❄️" }, // Moderate or heavy snow showers
  1261: { default: "🧊" }, // Light showers of ice pellets
  1264: { default: "🧊" }, // Moderate or heavy showers of ice pellets
  1279: { default: "⛈️" }, // Patchy light snow with thunder
  1282: { default: "⛈️" }, // Moderate or heavy snow with thunder
};

/**
 * Get emoji for weather condition code
 * @param code Weather condition code from WeatherAPI
 * @param isDay Whether it's daytime (1) or nighttime (0)
 * @returns Weather emoji string
 */
export function getWeatherEmoji(code: number, isDay?: number): string {
  const config = weatherEmojis[code];

  if (!config) {
    return "☁️"; // Default fallback
  }

  // Use night emoji if available and it's nighttime
  if (isDay === 0 && config.night) {
    return config.night;
  }

  return config.default;
}

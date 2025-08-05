import { WeatherDetails } from "@/components/weather-widget/weather-details";
import { fetchWeather } from "@/utils/fetch-weather";
import { formatWeatherData } from "@/utils/format-weather";
import { getPreferences } from "@/utils/preferences/server";
import { Hono } from "hono";

export const detailsRoute = new Hono();

detailsRoute.get(`/day/:date`, async (c) => {
  const date = c.req.param("date");

  const weather = await fetchWeather("Izmir");
  const preferences = await getPreferences(c);

  const day = weather.forecast.forecastday.find((day) => day.date === date);

  if (!day) {
    return new Response("404", { status: 404 });
  }

  return c.html(
    <WeatherDetails
      weather={formatWeatherData(day.day, "day")}
      preferences={preferences}
    />,
  );
});

detailsRoute.get(`/hour/:datetime`, async (c) => {
  const datetime = c.req.param("datetime");

  const [date, time] = datetime.split(" ");

  const weather = await fetchWeather("Izmir");
  const preferences = await getPreferences(c);

  const day = weather.forecast.forecastday.find((day) => day.date === date);

  const hour = day?.hour.find((hour) => hour.time === `${date} ${time}`);

  if (!day || !hour) {
    return new Response("404", { status: 404 });
  }

  return c.html(
    <WeatherDetails
      weather={formatWeatherData(hour, "hour")}
      preferences={preferences}
    />,
  );
});

import { Hono } from "hono";
import { PreferencesProvider } from "@/components/preferences-context";
import { WeatherDetails } from "@/components/weather-widget/weather-details";
import { fetchWeather } from "@/utils/fetch-weather";
import { formatWeatherData } from "@/utils/format-weather";
import { HourSnippet } from "@/components/weather-widget/hour-snippet";

export const detailsRoute = new Hono();

detailsRoute.get(`/day/:date`, async (c) => {
  const date = c.req.param("date");

  const day = c.weather.forecast.forecastday.find((day) => day.date === date);

  if (!day) {
    return new Response("404", { status: 404 });
  }

  c.cacheHeaders.use();

  return c.html(
    <PreferencesProvider preferences={c.preferences.data}>
      <WeatherDetails weather={formatWeatherData(day.day, "day")} />
    </PreferencesProvider>,
  );
});

detailsRoute.get(`/hour/:datetime`, async (c) => {
  const datetime = c.req.param("datetime");

  const [date, time] = datetime.split(" ");

  const day = c.weather.forecast.forecastday.find((day) => day.date === date);

  const hour = day?.hour.find((hour) => hour.time === `${date} ${time}`);

  if (!day || !hour) {
    return new Response("404", { status: 404 });
  }

  c.cacheHeaders.use();

  return c.html(
    <PreferencesProvider preferences={c.preferences.data}>
      <WeatherDetails weather={formatWeatherData(hour, "hour")} />
    </PreferencesProvider>,
  );
});

detailsRoute.get(`/hours/:date`, async (c) => {
  const date = c.req.param("date");

  const weather = await fetchWeather("Izmir");

  const day = weather.forecast.forecastday.find((day) => day.date === date);

  if (!day) {
    return new Response("404", { status: 404 });
  }

  c.cacheHeaders.use();

  return c.html(
    <PreferencesProvider preferences={c.preferences.data}>
      {day.hour.map((hour) => {
        return <HourSnippet hour={hour} />;
      })}
    </PreferencesProvider>,
  );
});

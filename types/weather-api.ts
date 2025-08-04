/**
 * Comprehensive TypeScript types for WeatherAPI.com
 * Based on the official API documentation
 */

// ===== BASE TYPES =====

/** Location information returned by the API */
export interface Location {
  /** Latitude in decimal degrees */
  lat: number;
  /** Longitude in decimal degrees */
  lon: number;
  /** Location name */
  name: string;
  /** Region or state of the location, if available */
  region: string;
  /** Location country */
  country: string;
  /** Time zone name */
  tz_id: string;
  /** Local date and time in unix time */
  localtime_epoch: number;
  /** Local date and time */
  localtime: string;
}

/** Weather condition information */
export interface WeatherCondition {
  /** Weather condition text */
  text: string;
  /** Weather icon url */
  icon: string;
  /** Weather condition unique code */
  code: number;
}

/** Air quality data */
export interface AirQuality {
  /** Carbon Monoxide (μg/m3) */
  co: number;
  /** Ozone (μg/m3) */
  o3: number;
  /** Nitrogen dioxide (μg/m3) */
  no2: number;
  /** Sulphur dioxide (μg/m3) */
  so2: number;
  /** PM2.5 (μg/m3) */
  pm2_5: number;
  /** PM10 (μg/m3) */
  pm10: number;
  /** US EPA Air Quality Index (1-6) */
  "us-epa-index": 1 | 2 | 3 | 4 | 5 | 6;
  /** UK Defra Air Quality Index (1-10) */
  "gb-defra-index": 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

/** Weather alert information */
export interface WeatherAlert {
  /** Alert headline */
  headline: string;
  /** Type of alert */
  msgtype: string;
  /** Severity of alert */
  severity: string;
  /** Urgency */
  urgency: string;
  /** Areas covered */
  areas: string;
  /** Category */
  category: string;
  /** Certainty */
  certainty: string;
  /** Event */
  event: string;
  /** Note */
  note: string;
  /** Effective date/time */
  effective: string;
  /** Expires date/time */
  expires: string;
  /** Description */
  desc: string;
  /** Instruction */
  instruction: string;
}

/** Weather alerts container */
export interface WeatherAlerts {
  alert: WeatherAlert[];
}

// ===== CURRENT WEATHER TYPES =====

/** Current weather conditions */
export interface Current {
  /** Local time when the real time data was updated */
  last_updated: string;
  /** Local time when the real time data was updated in unix time */
  last_updated_epoch: number;
  /** Temperature in celsius */
  temp_c: number;
  /** Temperature in fahrenheit */
  temp_f: number;
  /** Feels like temperature in celsius */
  feelslike_c: number;
  /** Feels like temperature in fahrenheit */
  feelslike_f: number;
  /** Windchill temperature in celsius */
  windchill_c: number;
  /** Windchill temperature in fahrenheit */
  windchill_f: number;
  /** Heat index in celsius */
  heatindex_c: number;
  /** Heat index in fahrenheit */
  heatindex_f: number;
  /** Dew point in celsius */
  dewpoint_c: number;
  /** Dew point in fahrenheit */
  dewpoint_f: number;
  /** Weather condition */
  condition: WeatherCondition;
  /** Wind speed in miles per hour */
  wind_mph: number;
  /** Wind speed in kilometer per hour */
  wind_kph: number;
  /** Wind direction in degrees */
  wind_degree: number;
  /** Wind direction as 16 point compass */
  wind_dir: string;
  /** Pressure in millibars */
  pressure_mb: number;
  /** Pressure in inches */
  pressure_in: number;
  /** Precipitation amount in millimeters */
  precip_mm: number;
  /** Precipitation amount in inches */
  precip_in: number;
  /** Humidity as percentage */
  humidity: number;
  /** Cloud cover as percentage */
  cloud: number;
  /** 1 = Yes 0 = No - Whether to show day condition icon or night icon */
  is_day: 0 | 1;
  /** UV Index */
  uv: number;
  /** Wind gust in miles per hour */
  gust_mph: number;
  /** Wind gust in kilometer per hour */
  gust_kph: number;
  /** Visibility in kilometers */
  vis_km: number;
  /** Visibility in miles */
  vis_miles: number;
  /** Air quality data (when aqi=yes parameter is passed) */
  air_quality?: AirQuality;
  /** Shortwave solar radiation or Global horizontal irradiation (GHI) W/m² (paid plans only) */
  short_rad?: number;
  /** Diffuse Horizontal Irradiation (DHI) W/m² (paid plans only) */
  diff_rad?: number;
  /** Direct Normal Irradiance (DNI) W/m² (paid plans only) */
  dni?: number;
  /** Global Tilted Irradiance (GTI) W/m² (paid plans only) */
  gti?: number;
}

// ===== FORECAST TYPES =====

/** Moon phases */
export type MoonPhase =
  | "New Moon"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full Moon"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent";

/** Astronomy data */
export interface Astro {
  /** Sunrise time */
  sunrise: string;
  /** Sunset time */
  sunset: string;
  /** Moonrise time */
  moonrise: string;
  /** Moonset time */
  moonset: string;
  /** Moon phase */
  moon_phase: MoonPhase;
  /** Moon illumination as % */
  moon_illumination: number;
  /** 1 = Yes or 0 = No - Is moon currently up */
  is_moon_up: 0 | 1;
  /** 1 = Yes or 0 = No - Is sun currently up */
  is_sun_up: 0 | 1;
}

/** Daily weather forecast */
export interface Day {
  /** Maximum temperature in celsius for the day */
  maxtemp_c: number;
  /** Maximum temperature in fahrenheit for the day */
  maxtemp_f: number;
  /** Minimum temperature in celsius for the day */
  mintemp_c: number;
  /** Minimum temperature in fahrenheit for the day */
  mintemp_f: number;
  /** Average temperature in celsius for the day */
  avgtemp_c: number;
  /** Average temperature in fahrenheit for the day */
  avgtemp_f: number;
  /** Maximum wind speed in miles per hour */
  maxwind_mph: number;
  /** Maximum wind speed in kilometer per hour */
  maxwind_kph: number;
  /** Total precipitation in millimeter */
  totalprecip_mm: number;
  /** Total precipitation in inches */
  totalprecip_in: number;
  /** Total snowfall in centimeters */
  totalsnow_cm: number;
  /** Average visibility in kilometer */
  avgvis_km: number;
  /** Average visibility in miles */
  avgvis_miles: number;
  /** Average humidity as percentage */
  avghumidity: number;
  /** Weather condition */
  condition: WeatherCondition;
  /** UV Index */
  uv: number;
  /** 1 = Yes 0 = No - Will it rain */
  daily_will_it_rain: 0 | 1;
  /** 1 = Yes 0 = No - Will it snow */
  daily_will_it_snow: 0 | 1;
  /** Chance of rain as percentage */
  daily_chance_of_rain: number;
  /** Chance of snow as percentage */
  daily_chance_of_snow: number;
  /** Air quality data */
  air_quality?: AirQuality;
}

/** Hourly weather forecast */
export interface Hour {
  /** Time as epoch */
  time_epoch: number;
  /** Date and time */
  time: string;
  /** Temperature in celsius */
  temp_c: number;
  /** Temperature in fahrenheit */
  temp_f: number;
  /** Weather condition */
  condition: WeatherCondition;
  /** Wind speed in miles per hour */
  wind_mph: number;
  /** Wind speed in kilometer per hour */
  wind_kph: number;
  /** Wind direction in degrees */
  wind_degree: number;
  /** Wind direction as 16 point compass */
  wind_dir: string;
  /** Pressure in millibars */
  pressure_mb: number;
  /** Pressure in inches */
  pressure_in: number;
  /** Precipitation amount in millimeters */
  precip_mm: number;
  /** Precipitation amount in inches */
  precip_in: number;
  /** Snowfall in centimeters */
  snow_cm: number;
  /** Humidity as percentage */
  humidity: number;
  /** Cloud cover as percentage */
  cloud: number;
  /** Feels like temperature in celsius */
  feelslike_c: number;
  /** Feels like temperature in fahrenheit */
  feelslike_f: number;
  /** Windchill temperature in celsius */
  windchill_c: number;
  /** Windchill temperature in fahrenheit */
  windchill_f: number;
  /** Heat index in celsius */
  heatindex_c: number;
  /** Heat index in fahrenheit */
  heatindex_f: number;
  /** Dew point in celsius */
  dewpoint_c: number;
  /** Dew point in fahrenheit */
  dewpoint_f: number;
  /** 1 = Yes 0 = No - Will it rain */
  will_it_rain: 0 | 1;
  /** 1 = Yes 0 = No - Will it snow */
  will_it_snow: 0 | 1;
  /** 1 = Yes 0 = No - Is it day */
  is_day: 0 | 1;
  /** Visibility in kilometer */
  vis_km: number;
  /** Visibility in miles */
  vis_miles: number;
  /** Chance of rain as percentage */
  chance_of_rain: number;
  /** Chance of snow as percentage */
  chance_of_snow: number;
  /** Wind gust in miles per hour */
  gust_mph: number;
  /** Wind gust in kilometer per hour */
  gust_kph: number;
  /** UV Index */
  uv: number;
  /** Air quality data */
  air_quality?: AirQuality;
  /** Shortwave solar radiation or Global horizontal irradiation (GHI) W/m² (paid plans only) */
  short_rad?: number;
  /** Diffuse Horizontal Irradiation (DHI) W/m² (paid plans only) */
  diff_rad?: number;
  /** Direct Normal Irradiance (DNI) W/m² (paid plans only) */
  dni?: number;
  /** Global Tilted Irradiance (GTI) W/m² (paid plans only) */
  gti?: number;
  /** Wind speed at 100m in mph (Enterprise only) */
  wind_mph_100?: number;
  /** Wind speed at 100m in kph (Enterprise only) */
  wind_kph_100?: number;
  /** Wind direction at 100m in degrees (Enterprise only) */
  wind_degree_100?: number;
  /** Wind direction at 100m as 16 point compass (Enterprise only) */
  wind_dir_100?: string;
  /** Evapotranspiration (Enterprise only) */
  et0?: number;
}

/** Single day forecast */
export interface ForecastDay {
  /** Forecast date */
  date: string;
  /** Forecast date as unix time */
  date_epoch: number;
  /** Day weather data */
  day: Day;
  /** Astronomy data */
  astro: Astro;
  /** Hourly weather data */
  hour: Hour[];
  /** Air quality data */
  air_quality?: AirQuality;
}

/** Forecast container */
export interface Forecast {
  forecastday: ForecastDay[];
}

// ===== MARINE TYPES =====

/** Tide information */
export interface Tide {
  /** Local tide time */
  tide_time: string;
  /** Tide height in meters */
  tide_height_mt: number;
  /** Type of tide - High or Low */
  tide_type: "High" | "Low";
}

/** Tides container */
export interface Tides {
  tide: Tide[];
}

/** Marine hour data (extends Hour with marine-specific fields) */
export interface MarineHour
  extends Omit<
    Hour,
    | "will_it_rain"
    | "will_it_snow"
    | "chance_of_rain"
    | "chance_of_snow"
    | "snow_cm"
  > {
  /** Significant wave height in metres */
  sig_ht_mt: number;
  /** Swell wave height in metres */
  swell_ht_mt: number;
  /** Swell wave height in feet */
  swell_ht_ft: number;
  /** Swell direction in degrees */
  swell_dir: number;
  /** Swell direction in 16 point compass */
  swell_dir_16_point: string;
  /** Swell period in seconds */
  swell_period_secs: number;
  /** Water temperature in Celsius (Pro+ plan and above) */
  water_temp_c?: number;
  /** Water temperature in Fahrenheit (Pro+ plan and above) */
  water_temp_f?: number;
}

/** Marine forecast day */
export interface MarineForecastDay {
  /** Forecast date */
  date: string;
  /** Forecast date as unix time */
  date_epoch: number;
  /** Day weather data */
  day: Day;
  /** Astronomy data */
  astro: Astro;
  /** Tide data */
  tides?: Tides;
  /** Hourly marine weather data */
  hour: MarineHour[];
}

/** Marine forecast container */
export interface MarineForecast {
  forecastday: MarineForecastDay[];
}

// ===== SPORTS TYPES =====

/** Sport information */
export interface Sport {
  /** Sport name */
  sport: string;
  /** Sport matches/events */
  matches: SportMatch[];
}

/** Sport match/event */
export interface SportMatch {
  /** Stadium name */
  stadium: string;
  /** Country */
  country: string;
  /** Region */
  region: string;
  /** Tournament name */
  tournament: string;
  /** Match start time */
  start: string;
  /** Team 1 name */
  team1: string;
  /** Team 2 name */
  team2: string;
}

// ===== API RESPONSE TYPES =====

/** Current weather API response */
export interface CurrentWeatherResponse {
  location: Location;
  current: Current;
}

/** Forecast API response */
export interface ForecastWeatherResponse {
  location: Location;
  current: Current;
  forecast: Forecast;
  alerts?: WeatherAlerts;
}

/** History API response */
export interface HistoryWeatherResponse {
  location: Location;
  forecast: Forecast;
}

/** Future API response */
export interface FutureWeatherResponse {
  location: Location;
  forecast: Forecast;
}

/** Marine API response */
export interface MarineWeatherResponse {
  location: Location;
  forecast: MarineForecast;
}

/** Alerts API response */
export interface AlertsResponse {
  location: Location;
  alerts: WeatherAlerts;
}

/** Search/Autocomplete API response */
export interface SearchResponse {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

/** IP Lookup API response */
export interface IPLookupResponse {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  is_eu: boolean;
  geoname_id: number;
  city: string;
  region: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

/** Astronomy API response */
export interface AstronomyResponse {
  location: Location;
  astronomy: {
    astro: Astro;
  };
}

/** Timezone API response */
export interface TimezoneResponse {
  location: Location;
}

/** Sports API response */
export interface SportsResponse {
  location: Location;
  sports: Sport[];
}

/** Bulk request location */
export interface BulkLocation {
  /** Query parameter (lat,lon, city name, etc.) */
  q: string;
  /** Custom identifier for your reference */
  custom_id?: string;
}

/** Bulk request body */
export interface BulkRequest {
  locations: BulkLocation[];
}

/** Bulk response item */
export interface BulkResponseItem {
  query: {
    custom_id?: string;
    q: string;
    location: Location;
    current: Current;
  };
}

/** Bulk response */
export interface BulkResponse {
  bulk: BulkResponseItem[];
}

// ===== REQUEST PARAMETER TYPES =====

/** Base API request parameters */
export interface BaseParams {
  /** API Key (required) */
  key: string;
  /** Query parameter - location (required) */
  q: string;
  /** Language code for condition text */
  lang?:
    | "ar"
    | "bn"
    | "bg"
    | "zh"
    | "zh_tw"
    | "cs"
    | "da"
    | "nl"
    | "fi"
    | "fr"
    | "de"
    | "el"
    | "hi"
    | "hu"
    | "it"
    | "ja"
    | "jv"
    | "ko"
    | "zh_cmn"
    | "mr"
    | "pl"
    | "pt"
    | "pa"
    | "ro"
    | "ru"
    | "sr"
    | "si"
    | "sk"
    | "es"
    | "sv"
    | "ta"
    | "te"
    | "tr"
    | "uk"
    | "ur"
    | "vi"
    | "zh_wuu"
    | "zh_hsn"
    | "zh_yue"
    | "zu";
}

/** Current weather API parameters */
export interface CurrentParams extends BaseParams {
  /** Enable/Disable Air Quality data */
  aqi?: "yes" | "no";
}

/** Forecast API parameters */
export interface ForecastParams extends BaseParams {
  /** Number of days of forecast required (1-14) */
  days?: number;
  /** Specific date for forecast (yyyy-MM-dd) */
  dt?: string;
  /** Unix timestamp */
  unixdt?: number;
  /** Specific hour (0-23) */
  hour?: number;
  /** Enable/Disable Air Quality data */
  aqi?: "yes" | "no";
  /** Enable/Disable Weather Alerts */
  alerts?: "yes" | "no";
  /** 15 min interval data (Enterprise only) */
  tp?: 15;
}

/** History API parameters */
export interface HistoryParams extends BaseParams {
  /** Date for history (yyyy-MM-dd) - required */
  dt: string;
  /** Unix timestamp */
  unixdt?: number;
  /** End date for history (yyyy-MM-dd) */
  end_dt?: string;
  /** Unix end timestamp */
  unixend_dt?: number;
  /** Specific hour (0-23) */
  hour?: number;
  /** Enable/Disable Air Quality data */
  aqi?: "yes" | "no";
  /** 15 min interval data (Enterprise only) */
  tp?: 15;
  /** Enable solar irradiance data (Enterprise only) */
  solar?: "yes";
  /** Enable Evapotranspiration data (Enterprise only) */
  et0?: "yes";
  /** Enable wind data at 100m height in mph (Enterprise only) */
  wind100mph?: "yes";
  /** Enable wind data at 100m height in kph (Enterprise only) */
  wind100kph?: "yes";
}

/** Future API parameters */
export interface FutureParams extends BaseParams {
  /** Date for future weather (yyyy-MM-dd) - required */
  dt: string;
  /** Unix timestamp */
  unixdt?: number;
}

/** Marine API parameters */
export interface MarineParams extends BaseParams {
  /** Number of days of forecast required */
  days?: number;
  /** Specific date (yyyy-MM-dd) */
  dt?: string;
  /** Unix timestamp */
  unixdt?: number;
  /** Specific hour (0-23) */
  hour?: number;
  /** Enable/Disable Tide data */
  tides?: "yes" | "no";
}

/** Search API parameters */
export interface SearchParams extends BaseParams {
  /** Query is required but inherits from BaseParams */
}

/** Alerts API parameters */
export interface AlertsParams extends BaseParams {
  /** Query is required but inherits from BaseParams */
}

/** Astronomy API parameters */
export interface AstronomyParams extends BaseParams {
  /** Date for astronomy (yyyy-MM-dd) */
  dt?: string;
}

/** Timezone API parameters */
export interface TimezoneParams extends BaseParams {
  /** Query is required but inherits from BaseParams */
}

/** Sports API parameters */
export interface SportsParams extends BaseParams {
  /** Query is required but inherits from BaseParams */
}

/** IP Lookup API parameters */
export interface IPLookupParams {
  /** API Key (required) */
  key: string;
  /** IP address (required) */
  q: string;
}

// ===== ERROR TYPES =====

/** API Error response */
export interface WeatherAPIError {
  error: {
    code: number;
    message: string;
  };
}

// ===== UTILITY TYPES =====

/** All possible API endpoints */
export type APIEndpoint =
  | "current.json"
  | "forecast.json"
  | "history.json"
  | "future.json"
  | "marine.json"
  | "alerts.json"
  | "search.json"
  | "astronomy.json"
  | "timezone.json"
  | "sports.json"
  | "ip.json";

/** API response type based on endpoint */
export type APIResponseMap = {
  "current.json": CurrentWeatherResponse;
  "forecast.json": ForecastWeatherResponse;
  "history.json": HistoryWeatherResponse;
  "future.json": FutureWeatherResponse;
  "marine.json": MarineWeatherResponse;
  "alerts.json": AlertsResponse;
  "search.json": SearchResponse[];
  "astronomy.json": AstronomyResponse;
  "timezone.json": TimezoneResponse;
  "sports.json": SportsResponse;
  "ip.json": IPLookupResponse;
};

/** API params type based on endpoint */
export type APIParamsMap = {
  "current.json": CurrentParams;
  "forecast.json": ForecastParams;
  "history.json": HistoryParams;
  "future.json": FutureParams;
  "marine.json": MarineParams;
  "alerts.json": AlertsParams;
  "search.json": SearchParams;
  "astronomy.json": AstronomyParams;
  "timezone.json": TimezoneParams;
  "sports.json": SportsParams;
  "ip.json": IPLookupParams;
};

import { WeatherData } from "./types";

export async function getWeather(
  latitude: string,
  longitude: string
): Promise<WeatherData> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  );
  const data = await response.json();
  return {
    temperature:
      data.current.temperature_2m.toString() +
      " " +
      data.current_units.temperature_2m,
  };
}

export async function getQueryLocation(query: string): Promise<WeatherData[]> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
  );

  const results = await response.json();
  console.log(results);
  const mapped: WeatherData[] = results.results.map((result: any) => {
    return {
      id: result.id,
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      area: result.admin1,
      country: result.country,
    };
  });

  console.log(mapped);

  return mapped;
}

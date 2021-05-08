import axios from "axios";
import { locationMapper, weatherMapper } from "../utils/mappers";

const weatherApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
});

export const getLocations = async () => {
  try {
    const { data: rawLocations } = await weatherApi.get("municipios");
    const locations = rawLocations.map(locationMapper);
    return { locations };
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherByLocation = async ({ stateId, locationId }) => {
  try {
    const { data: rawWeather } = await weatherApi.get(
      `provincias/${stateId}/municipios/${locationId}`
    );
    const weather = weatherMapper(rawWeather);
    return { weather };
  } catch (error) {
    console.error(error);
  }
};

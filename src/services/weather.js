import axios from "axios";
import { weatherMapper } from "../utils/mappers";

const weatherApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
});

export const getWeatherByPlace = async ({ countycode, code }) => {
  try {
    const { data: rawWeather } = await weatherApi.get(
      `provincias/${countycode}/municipios/${code}`
    );
    const weather = weatherMapper(rawWeather);
    return { ...weather };
  } catch (error) {
    console.error(error);
  }
};

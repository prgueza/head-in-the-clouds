import axios from "axios";
import { weatherMapper } from "../utils/mappers";

const weatherApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
});

export const getWeatherByLocation = async ({ countyCode, code }) => {
  try {
    const { data: rawWeather } = await weatherApi.get(
      `provincias/${countyCode}/municipios/${code}`
    );
    const weather = weatherMapper(rawWeather);
    return { ...weather };
  } catch (error) {
    console.error(error);
  }
};

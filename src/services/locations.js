import axios from "axios";
import { locationMapper } from "../utils/mappers";

const locationsApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
});

export const getLocations = async () => {
  try {
    const { data: rawLocations } = await locationsApi.get("municipios");
    const locations = rawLocations.map(locationMapper);
    return { locations };
  } catch (error) {
    console.error(error);
  }
};

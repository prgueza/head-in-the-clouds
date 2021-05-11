import axios from "axios";
import { townMapper } from "../utils/mappers";

const townsApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
});

export const getTowns = async () => {
  try {
    const { data: rawTowns } = await townsApi.get("municipios");
    const towns = rawTowns.map(townMapper);
    return { towns };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

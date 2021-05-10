import axios from "axios";

const collectionsApi = axios.create({
  baseURL: process.env.REACT_APP_COLLECTIONS_API_URL,
});

export const getLocations = async ({ collectionId }, { token }) => {
  try {
    const { data: locations } = await collectionsApi.get("locations", {
      params: { collection: collectionId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return { locations };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

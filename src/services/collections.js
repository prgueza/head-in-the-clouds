import axios from "axios";

const collectionsApi = axios.create({
  baseURL: process.env.REACT_APP_COLLECTIONS_API_URL,
});

export const getCollections = async ({ token }) => {
  try {
    const { data: collections } = await collectionsApi.get("collections", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { collections };
  } catch (error) {
    console.error(error);
  }
};

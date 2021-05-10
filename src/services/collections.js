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
    throw error;
  }
};

export const postCollection = async (
  { name, icon = "visMapCoordinate", locations = [] },
  { token }
) => {
  try {
    const { data: response } = await collectionsApi.post(
      "collections",
      { name, icon, locations },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { collection: response.collection };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCollection = async ({ collectionId }, { token }) => {
  try {
    const { data: response } = await collectionsApi.delete(
      `collections/${collectionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { collection: response.resource };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
  { name, icon = "visMapCoordinate", places = [] },
  { token }
) => {
  try {
    const { data: response } = await collectionsApi.post(
      "collections",
      { name, icon, places },
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

export const deleteCollection = async ({ collection }, { token }) => {
  try {
    const { data: response } = await collectionsApi.delete(
      `collections/${collection._id}`,
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

export const getPlaces = async ({ collection }, { token }) => {
  try {
    const { data: places } = await collectionsApi.get("places", {
      params: { collection: collection._id },
      headers: { Authorization: `Bearer ${token}` },
    });
    return { places };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postPlace = async ({ collection, place }, { token }) => {
  try {
    const { data: response } = await collectionsApi.post(
      "places",
      {
        collectionId: collection._id,
        name: place.name,
        county: place.county,
        code: place.code,
        countyCode: place.countyCode,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { place: response.place };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePlace = async ({ place }, { token }) => {
  try {
    const { data: response } = await collectionsApi.delete(
      `places/${place._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { place: response.place };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import C from "../constants";
import { bindActionCreators } from "@reduxjs/toolkit";

const setCollection = ({ collection }) => ({
  type: C.COLLECTION_SET,
  payload: { collection },
});

const getCollections = () => ({
  type: C.COLLECTIONS_FETCH_REQUESTED,
});

export const getCollectionsSucceeded = ({ collections }) => ({
  type: C.COLLECTIONS_FETCH_SUCCEEDED,
  payload: { collections },
});

export const getCollectionsFailed = ({ message }) => ({
  type: C.COLLECTIONS_FETCH_FAILED,
  payload: { message },
});

const postCollection = ({ collection }) => ({
  type: C.COLLECTION_POST_REQUESTED,
  payload: { collection },
});

export const postCollectionSucceeded = ({ collection }) => ({
  type: C.COLLECTION_POST_SUCCEEDED,
  payload: { collection },
});

export const postCollectionFailed = ({ message }) => ({
  type: C.COLLECTION_POST_FAILED,
  payload: { message },
});

const deleteExistingCollection = ({ collection }) => ({
  type: C.COLLECTION_DELETE_REQUESTED,
  payload: { collection },
});

export const deleteExistingCollectionSucceeded = ({ collection }) => ({
  type: C.COLLECTION_DELETE_SUCCEEDED,
  payload: { collection },
});

export const deleteExistingCollectionFailed = ({ message }) => ({
  type: C.COLLECTION_DELETE_FAILED,
  payload: { message },
});

const addPlaceToCollection = ({ collection, place }) => ({
  type: C.COLLECTION_ADD_PLACE_REQUESTED,
  payload: { collection, place },
});

export const addPlaceToCollectionSucceeded = ({ collection, place }) => ({
  type: C.COLLECTION_ADD_PLACE_SUCCEEDED,
  payload: { collection, place },
});

export const addPlaceToCollectionFailed = ({ message }) => ({
  type: C.COLLECTION_ADD_PLACE_FAILED,
  payload: { message },
});

const removePlaceFromCollection = ({ collection, place }) => ({
  type: C.COLLECTION_DELETE_PLACE_REQUESTED,
  payload: { collection, place },
});

export const removePlaceFromCollectionSucceeded = ({ collection, place }) => ({
  type: C.COLLECTION_DELETE_PLACE_SUCCEEDED,
  payload: { collection, place },
});

export const removePlaceFromCollectionFailed = ({ message }) => ({
  type: C.COLLECTION_DELETE_PLACE_FAILED,
  payload: { message },
});

const collectionsActionsCreators = {
  setCollection,
  getCollections,
  getCollectionsSucceeded,
  getCollectionsFailed,
  postCollection,
  postCollectionSucceeded,
  postCollectionFailed,
  deleteExistingCollection,
  deleteExistingCollectionSucceeded,
  deleteExistingCollectionFailed,
  addPlaceToCollection,
  addPlaceToCollectionSucceeded,
  addPlaceToCollectionFailed,
  removePlaceFromCollection,
  removePlaceFromCollectionSucceeded,
  removePlaceFromCollectionFailed,
};

const collectionsActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(collectionsActionsCreators, dispatch),
  };
};

export default collectionsActions;

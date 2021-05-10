import C from "../constants";
import { bindActionCreators } from "@reduxjs/toolkit";

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

const deleteCollection = ({ collection }) => ({
  type: C.COLLECTION_DELETE_REQUESTED,
  payload: { collection },
});

export const deleteCollectionSucceeded = ({ collection }) => ({
  type: C.COLLECTION_DELETE_SUCCEEDED,
  payload: { collection },
});

export const deleteCollectionFailed = ({ message }) => ({
  type: C.COLLECTION_DELETE_FAILED,
  payload: { message },
});

const collectionsActionsCreators = {
  getCollections,
  getCollectionsSucceeded,
  getCollectionsFailed,
  postCollection,
  postCollectionSucceeded,
  postCollectionFailed,
  deleteCollection,
  deleteCollectionSucceeded,
  deleteCollectionFailed,
};

const collectionsActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(collectionsActionsCreators, dispatch),
  };
};

export default collectionsActions;

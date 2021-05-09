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

const collectionsActionsCreators = {
  getCollections,
  getCollectionsSucceeded,
  getCollectionsFailed,
};

const collectionsActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(collectionsActionsCreators, dispatch),
  };
};

export default collectionsActions;

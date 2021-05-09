import C from "../constants";
import { bindActionCreators } from "@reduxjs/toolkit";

const getLocations = () => ({
  type: C.LOCATIONS_FETCH_REQUESTED,
});

export const getLocationsSucceeded = ({ locations }) => ({
  type: C.LOCATIONS_FETCH_SUCCEEDED,
  payload: { locations },
});

export const getLocationsFailed = ({ message }) => ({
  type: C.LOCATIONS_FETCH_FAILED,
  payload: { message },
});

export const selectLocations = ({ selectedLocations }) => ({
  type: C.LOCATIONS_SELECTED,
  payload: { selectedLocations },
});

const queryLocations = ({ query }) => ({
  type: C.LOCATIONS_QUERIED,
  payload: { query },
});

const locationsActionsCreators = {
  getLocations,
  getLocationsSucceeded,
  getLocationsFailed,
  selectLocations,
  queryLocations,
};

const locationsActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(locationsActionsCreators, dispatch),
  };
};

export default locationsActions;

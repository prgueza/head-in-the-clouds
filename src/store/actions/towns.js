import C from "../constants";
import { bindActionCreators } from "@reduxjs/toolkit";

const getTowns = () => ({
  type: C.TOWNS_FETCH_REQUESTED,
});

export const getTownsSucceeded = ({ towns }) => ({
  type: C.TOWNS_FETCH_SUCCEEDED,
  payload: { towns },
});

export const getTownsFailed = ({ message }) => ({
  type: C.TOWNS_FETCH_FAILED,
  payload: { message },
});

export const selectTowns = ({ selectedTowns }) => ({
  type: C.TOWNS_SELECTED,
  payload: { selectedTowns },
});

const queryTowns = ({ query }) => ({
  type: C.TOWNS_QUERIED,
  payload: { query },
});

const townsActionsCreators = {
  getTowns,
  getTownsSucceeded,
  getTownsFailed,
  selectTowns,
  queryTowns,
};

const townsActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(townsActionsCreators, dispatch),
  };
};

export default townsActions;

import C from "../constants";
import { bindActionCreators } from "@reduxjs/toolkit";

export const getTowns = () => ({
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

export const queryTowns = ({ query }) => ({
  type: C.TOWNS_QUERIED,
  payload: { query },
});

const townsActionsCreators = {
  getTowns,
  selectTowns,
  queryTowns,
};

/*
  No need to bind the intermediate actions (SUCCEEDED/FAILED) as redux-saga's put method
  already does this for us and it's the only module that uses these actions.
*/
const townsActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(townsActionsCreators, dispatch),
  };
};

export default townsActions;

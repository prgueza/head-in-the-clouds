import C from "../constants";

import { call, put, takeEvery } from "redux-saga/effects";
import { getTowns } from "../../services/towns";

import { getTownsSucceeded, getTownsFailed } from "../actions/towns";

function* getTownsList() {
  try {
    const { towns } = yield call(getTowns);
    yield put(getTownsSucceeded({ towns }));
  } catch (error) {
    yield put(getTownsFailed({ message: error.message }));
  }
}

function* townsSaga() {
  yield takeEvery(C.TOWNS_FETCH_REQUESTED, getTownsList);
}

export default townsSaga;

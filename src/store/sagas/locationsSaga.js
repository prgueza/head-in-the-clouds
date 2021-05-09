import C from "../constants";

import { call, put, takeEvery } from "redux-saga/effects";
import { getLocations } from "../../services/locations";

import {
  getLocationsSucceeded,
  getLocationsFailed,
} from "../actions/locations";

function* getLocationList() {
  try {
    const { locations } = yield call(getLocations);
    yield put(getLocationsSucceeded({ locations }));
  } catch (error) {
    yield put(getLocationsFailed({ message: error.message }));
  }
}

function* locationsSaga() {
  yield takeEvery(C.LOCATIONS_FETCH_REQUESTED, getLocationList);
}

export default locationsSaga;

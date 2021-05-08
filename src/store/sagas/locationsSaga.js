import { call, put, takeEvery } from "redux-saga/effects";
import { getLocations } from "../../services/weather";

function* getLocationList() {
  try {
    const { locations } = yield call(getLocations);
    yield put({ type: "LOCATION_FETCH_SUCCEEDED", locations });
  } catch (error) {
    yield put({ type: "LOCATION_FETCH_FAILED", message: error.message });
  }
}

function* locationsSaga() {
  yield takeEvery("LOCATION_FETCH_REQUESTED", getLocationList);
}

export default locationsSaga;

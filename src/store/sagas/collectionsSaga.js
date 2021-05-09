import { call, put, takeEvery, select } from "redux-saga/effects";
import { getCollections } from "../../services/collections";
import C from "../constants";

// Selectors
import authSelectors from "../selectors/auth";

import {
  getCollectionsSucceeded,
  getCollectionsFailed,
} from "../actions/collections";

function* getCollectionsList() {
  try {
    const { token } = yield select(authSelectors);
    const { collections } = yield call(getCollections, { token });
    yield put(getCollectionsSucceeded({ collections }));
  } catch (error) {
    yield put(getCollectionsFailed({ message: error.message }));
  }
}

function* collectionsSaga() {
  yield takeEvery(C.COLLECTIONS_FETCH_REQUESTED, getCollectionsList);
}

export default collectionsSaga;

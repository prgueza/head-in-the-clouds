import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  deleteCollection,
  getCollections,
  postCollection,
} from "../../services/collections";
import C from "../constants";

//Toasts
import {
  addToast,
  successToast,
  errorToast,
} from "../../components/iom-toasts-list/IomToastsList";

// Selectors
import authSelectors from "../selectors/auth";

import {
  getCollectionsSucceeded,
  getCollectionsFailed,
  postCollectionSucceeded,
  postCollectionFailed,
  deleteCollectionSucceeded,
  deleteCollectionFailed,
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

function* createNewCollection({ payload }) {
  try {
    const { token } = yield select(authSelectors);
    const { name, icon, locations } = payload.collection;
    const { collection } = yield call(
      postCollection,
      { name, icon, locations },
      { token }
    );
    yield put(postCollectionSucceeded({ collection }));
    addToast(
      successToast({
        title: "Collection saved!",
        text: `Collection ${collection.name} is now available for you at the Collections section.`,
      })
    );
  } catch (error) {
    yield put(postCollectionFailed({ message: error.message }));
    addToast(
      errorToast({
        title: "Collection could not be saved!",
        text: `The doctors tried everything but the collection passed away during its trip to the server.`,
      })
    );
  }
}

function* deleteExistingCollection({ payload }) {
  try {
    const { token } = yield select(authSelectors);
    const { collection } = payload;
    yield call(deleteCollection, { collectionId: collection._id }, { token });
    yield put(deleteCollectionSucceeded({ collection: payload.collection }));
    addToast(
      successToast({
        title: "Collection deleted!",
        text: `Sad to see ${payload.collection.name} go...`,
      })
    );
  } catch (error) {
    yield put(deleteCollectionFailed({ message: error.message }));
    addToast(
      errorToast({
        title: "Collection could not be deleted!",
        text: "No can do, the collection doesn't want to leave us.",
      })
    );
  }
}

export function* getCollectionsSaga() {
  yield takeEvery(C.COLLECTIONS_FETCH_REQUESTED, getCollectionsList);
}

export function* postCollectionSaga() {
  yield takeEvery(C.COLLECTION_POST_REQUESTED, createNewCollection);
}

export function* deleteCollectionSaga() {
  yield takeEvery(C.COLLECTION_DELETE_REQUESTED, deleteExistingCollection);
}

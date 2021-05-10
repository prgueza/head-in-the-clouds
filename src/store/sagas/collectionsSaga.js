import { call, put, takeEvery, select } from "redux-saga/effects";
import C from "../constants";

// Services
import {
  getCollections,
  updateCollections,
  postCollection,
  deleteCollection,
  postPlace,
  deletePlace,
} from "../../services/collections";

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
  deleteExistingCollectionSucceeded,
  deleteExistingCollectionFailed,
  addPlaceToCollectionSucceeded,
  addPlaceToCollectionFailed,
  removePlaceFromCollectionSucceeded,
  removePlaceFromCollectionFailed,
  reorderCollectionsSucceeded,
  reorderCollectionsFailed,
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
    const { name, icon, places } = payload.collection;
    const { collection } = yield call(
      postCollection,
      { name, icon, places },
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
    yield call(deleteCollection, { collection }, { token });
    yield put(deleteExistingCollectionSucceeded({ collection }));
    addToast(
      successToast({
        title: "Collection deleted!",
        text: `Sad to see ${collection.name} go...`,
      })
    );
  } catch (error) {
    yield put(deleteExistingCollectionFailed({ message: error.message }));
    addToast(
      errorToast({
        title: "Collection could not be deleted!",
        text: "No can do, the collection doesn't want to leave us.",
      })
    );
  }
}

function* addPlaceToCollection({ payload }) {
  try {
    const { token } = yield select(authSelectors);
    const { collection, place } = payload;
    yield call(postPlace, { place, collection }, { token });
    yield put(addPlaceToCollectionSucceeded({ collection, place }));
    addToast(
      successToast({
        title: "New place added!",
        text: `The place ${place.name} has been added to the ${collection.name} collection`,
      })
    );
  } catch (error) {
    yield put(addPlaceToCollectionFailed({ message: error.message }));
    addToast(
      errorToast({
        title: "Place could not be added!",
        text: "Something went wrong...",
      })
    );
  }
}

function* removePlaceFromCollection({ payload }) {
  try {
    const { token } = yield select(authSelectors);
    const { collection, place } = payload;
    yield call(deletePlace, { place }, { token });
    yield put(removePlaceFromCollectionSucceeded({ collection, place }));
    addToast(
      successToast({
        title: "Place removed!",
        text: `The place ${place.name} no longer belongs to the ${collection.name} collection`,
      })
    );
  } catch (error) {
    yield put(removePlaceFromCollectionFailed({ message: error.message }));
    addToast(
      errorToast({
        title: "Place could not be removed!",
        text: "Something went wrong...",
      })
    );
  }
}

function* reorderCollections({ payload }) {
  try {
    const { token } = yield select(authSelectors);
    const { collections } = payload;
    yield call(updateCollections, { collections }, { token });
    yield put(reorderCollectionsSucceeded({ collections }));
  } catch (error) {
    yield put(reorderCollectionsFailed({ message: error.message }));
    addToast(
      errorToast({
        title: "New order couln't be saved!",
        text: "Back to the original order...",
      })
    );
  }
}

export function* getCollectionsSaga() {
  yield takeEvery(C.COLLECTIONS_FETCH_REQUESTED, getCollectionsList);
}

export function* reorderCollectionsSaga() {
  yield takeEvery(C.COLLECTIONS_REORDER_REQUESTED, reorderCollections);
}

export function* postCollectionSaga() {
  yield takeEvery(C.COLLECTION_POST_REQUESTED, createNewCollection);
}

export function* deleteCollectionSaga() {
  yield takeEvery(C.COLLECTION_DELETE_REQUESTED, deleteExistingCollection);
}

export function* addPlaceToCollectionSaga() {
  yield takeEvery(C.COLLECTION_ADD_PLACE_REQUESTED, addPlaceToCollection);
}

export function* removePlaceFromCollectionSaga() {
  yield takeEvery(
    C.COLLECTION_DELETE_PLACE_REQUESTED,
    removePlaceFromCollection
  );
}

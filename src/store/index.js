import C from "./constants";
import { createStore, applyMiddleware, combineReducers } from "redux";

// Middlewares
import createSagaMiddleware from "redux-saga";
import { localStorageMiddleware } from "./middlewares/localStorageMiddleware";

// Reducers
import authReducer from "./reducers/authReducer";
import townsReducer from "./reducers/townsReducer";
import collectionsReducer from "./reducers/collectionsReducer";

// Sagas
import townsSaga from "./sagas/townsSaga";
import { SignUpSaga, SignInSaga } from "./sagas/authSaga";
import {
  getCollectionsSaga,
  postCollectionSaga,
  deleteCollectionSaga,
  addPlaceToCollectionSaga,
  removePlaceFromCollectionSaga,
  reorderCollectionsSaga,
} from "./sagas/collectionsSaga";

const reducers = combineReducers({
  auth: authReducer,
  towns: townsReducer,
  collections: collectionsReducer,
});

// Root reducer in charge of reseting the store upon Signout
const reducer = (state, action) => {
  if (action.type === C.SIGNOUT) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [localStorageMiddleware, sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  const reduxLogger = require("redux-logger");
  const logger = reduxLogger.createLogger();
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(SignInSaga);
sagaMiddleware.run(SignUpSaga);
sagaMiddleware.run(townsSaga);
sagaMiddleware.run(getCollectionsSaga);
sagaMiddleware.run(reorderCollectionsSaga);
sagaMiddleware.run(postCollectionSaga);
sagaMiddleware.run(deleteCollectionSaga);
sagaMiddleware.run(addPlaceToCollectionSaga);
sagaMiddleware.run(removePlaceFromCollectionSaga);

export default store;

import { createStore, applyMiddleware, combineReducers } from "redux";

// Middlewares
import createSagaMiddleware from "redux-saga";
import { localStorageMiddleware } from "./middlewares/localStorageMiddleware";

// Reducers
import authReducer from "./reducers/authReducer";
import townsReducer from "./reducers/townsReducer";
import collectionsReducer from "./reducers/collectionsReducer";

// Sagas
import { SignUpSaga, SignInSaga } from "./sagas/authSaga";
import townsSaga from "./sagas/townsSaga";
import collectionsSaga from "./sagas/collectionsSaga";

const reducer = combineReducers({
  auth: authReducer,
  towns: townsReducer,
  collections: collectionsReducer,
});

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
sagaMiddleware.run(collectionsSaga);

export default store;

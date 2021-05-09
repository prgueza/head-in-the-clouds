import { createStore, applyMiddleware, combineReducers } from "redux";

// Middlewares
import createSagaMiddleware from "redux-saga";
import { localStorageMiddleware } from "./middlewares/localStorageMiddleware";

// Reducers
import authReducer from "./reducers/authReducer";
import locationsReducer from "./reducers/locationsReducer";
// import weatherReducer from "./reducers/weatherReducer";

// Sagas
import { SignUpSaga, SignInSaga } from "./sagas/authSaga";
import locationsSaga from "./sagas/locationsSaga";
// import weatherSaga from "./sagas/weatherSaga";

const reducer = combineReducers({
  auth: authReducer,
  locations: locationsReducer,
  // weather: weatherReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [localStorageMiddleware, sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  const reduxLogger = require("redux-logger");
  const logger = reduxLogger.createLogger();
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(locationsSaga);
sagaMiddleware.run(SignInSaga);
sagaMiddleware.run(SignUpSaga);
// sagaMiddleware.run(weatherSaga);

export default store;

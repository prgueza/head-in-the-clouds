import { createStore, applyMiddleware, combineReducers } from "redux";

// Middlewares
import createSagaMiddleware from "redux-saga";
import { localStorageMiddleware } from "./middlewares/localStorageMiddleware";

// Reducers
import authReducer from "./reducers/authReducer";
import weatherReducer from "./reducers/weatherReducer";
// import locationsReducer from "./reducers/locationsReducer";

// Sagas
import { SignUpSaga, SignInSaga } from "./sagas/authSaga";
// import weatherSaga from "./sagas/weatherSaga";
// import locationsSaga from "./sagas/locationsSaga";

const reducer = combineReducers({
  weather: weatherReducer,
  // locations: locationsReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [localStorageMiddleware, sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  const reduxLogger = require("redux-logger");
  const logger = reduxLogger.createLogger();
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

// sagaMiddleware.run(weatherSaga);
// sagaMiddleware.run(locationsSaga);
sagaMiddleware.run(SignInSaga);
sagaMiddleware.run(SignUpSaga);

export default store;

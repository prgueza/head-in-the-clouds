import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import C from "../constants";

const generateToken = (data, exp) => {
  const expiresIn = exp ? dayjs(exp, "X").diff(dayjs(), "s") : 3600;
  const token = jwt.sign(data, process.env.REACT_APP_STORAGE_JWT_KEY, {
    expiresIn,
  });
  return { token };
};

const verifyToken = (token) => {
  const { data, exp } = jwt.verify(token);
  return { data, exp };
};

export const localStorageMiddleware = () => (next) => (action) => {
  if (
    action.type === C.SIGNIN_SIGNUP_SUCCEEDED &&
    action.payload.keepLoggedIn
  ) {
    const { token: userToken } = generateToken(action.payload.user);
    window.localStorage.setItem("wtwl-user-token", userToken);
    window.localStorage.setItem("wtwl-api-token", action.payload.token);
  } else if (action.type === C.SIGNOUT) {
    window.localStorage.removeItem("wtwl-user-token");
    window.localStorage.removeItem("wtwl-api-token");
  } else if (action.type === C.RESTORE) {
    const token = window.localStorage.getItem("wtwl-user-token");
    const apiToken = window.localStorage.getItem("wtwl-api-token");
    if (!token || !apiToken) next(action);
    const { data: user, exp } = verifyToken(token);
    const updatedUserToken = generateToken(user, exp);
    window.localStorage.setItem("wtwl-user-token", updatedUserToken);
    action.payload.user = user;
    action.payload.token = apiToken;
  }
  next(action);
};

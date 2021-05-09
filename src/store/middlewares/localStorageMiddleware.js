import jwt from "jsonwebtoken";
import C from "../constants";

const generateToken = (data) => {
  delete data.exp;
  const token = jwt.sign(data, process.env.REACT_APP_STORAGE_JWT_KEY, {
    expiresIn: 3600,
  });
  return { token };
};

const verifyToken = (token) => {
  const data = jwt.verify(token, process.env.REACT_APP_STORAGE_JWT_KEY);
  return { data };
};

export const localStorageMiddleware = () => (next) => (action) => {
  if (
    action.type === C.SIGNIN_SIGNUP_SUCCEEDED &&
    action.payload.keepLoggedIn
  ) {
    try {
      const { token: userToken } = generateToken(action.payload.user);
      window.localStorage.setItem("wtwl-user-token", userToken);
      window.localStorage.setItem("wtwl-api-token", action.payload.token);
    } catch (error) {
      console.error("Set", error);
      return next(action);
    }
  } else if (action.type === C.SIGNOUT) {
    window.localStorage.removeItem("wtwl-user-token");
    window.localStorage.removeItem("wtwl-api-token");
  } else if (action.type === C.RESTORE) {
    try {
      const token = window.localStorage.getItem("wtwl-user-token");
      const apiToken = window.localStorage.getItem("wtwl-api-token");
      if (!token || !apiToken) return;
      const { data: user } = verifyToken(token);
      const { token: newUserToken } = generateToken(user);
      window.localStorage.setItem("wtwl-user-token", newUserToken);
      action.payload = { user, token: apiToken };
    } catch (error) {
      console.error("Restore", error);
      return;
    }
  }

  next(action);
};

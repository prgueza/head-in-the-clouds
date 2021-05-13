import C from "../constants";
import tokens from "../../utils/tokens";

export const localStorageMiddleware = () => (next) => (action) => {
  if (
    action.type === C.SIGNIN_SIGNUP_SUCCEEDED &&
    action.payload.keepLoggedIn
  ) {
    try {
      const { token: userToken } = tokens.generateToken(action.payload.user);
      window.localStorage.setItem("hitc-user-token", userToken);
      window.localStorage.setItem("hitc-api-token", action.payload.token);
    } catch (error) {
      console.error("Set", error);
      return next(action);
    }
  } else if (action.type === C.SIGNOUT) {
    window.localStorage.removeItem("hitc-user-token");
    window.localStorage.removeItem("hitc-api-token");
  } else if (action.type === C.RESTORE) {
    try {
      const token = window.localStorage.getItem("hitc-user-token");
      const apiToken = window.localStorage.getItem("hitc-api-token");
      if (!token || !apiToken) return;
      const { data: user } = tokens.verifyToken(token);
      const { token: newUserToken } = tokens.generateToken(user);
      window.localStorage.setItem("hitc-user-token", newUserToken);
      action.payload = { user, token: apiToken };
    } catch (error) {
      console.error("Restore", error);
      return;
    }
  }

  next(action);
};

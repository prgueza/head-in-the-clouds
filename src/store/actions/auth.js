import C from "../constants";
import { bindActionCreators } from "@reduxjs/toolkit";

const signIn = ({ identifier, password, keepLoggedIn }) => ({
  type: C.SIGNIN_REQUESTED,
  payload: { identifier, password, keepLoggedIn },
});

const signUp = ({ username, email, password, confirmPassword }) => ({
  type: C.SIGNUP_REQUESTED,
  payload: { username, email, password, confirmPassword },
});

const signOut = () => ({ type: C.SIGNOUT });

const restore = () => ({ type: C.RESTORE });

export const signInSignUpSucceeded = ({ user, token, keepLoggedIn }) => ({
  type: C.SIGNIN_SIGNUP_SUCCEEDED,
  payload: { user, token, keepLoggedIn },
});

export const signInSignUpFailed = ({ message }) => ({
  type: C.SIGNIN_SIGNUP_FAILED,
  payload: { message },
});

const authActionsCreators = {
  signIn,
  signUp,
  signOut,
  restore,
};

const authActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(authActionsCreators, dispatch),
  };
};

export default authActions;

import C from "../constants";
import { bindActionCreators } from "@reduxjs/toolkit";

export const signIn = ({ identifier, password, keepLoggedIn }) => ({
  type: C.SIGNIN_REQUESTED,
  payload: { identifier, password, keepLoggedIn },
});

export const signUp = ({ username, email, password, confirmPassword }) => ({
  type: C.SIGNUP_REQUESTED,
  payload: { username, email, password, confirmPassword },
});

export const signOut = () => ({ type: C.SIGNOUT });

export const restore = () => ({ type: C.RESTORE });

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

/*
  No need to bind the intermediate actions (SUCCEEDED/FAILED) as redux-saga's put method
  already does this for us and it's the only module that uses these actions.
*/
const authActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(authActionsCreators, dispatch),
  };
};

export default authActions;

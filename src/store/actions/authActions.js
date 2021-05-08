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

const signInSignUpSucceeded = ({
  username,
  email,
  password,
  confirmPassword,
}) => ({
  type: C.SIGNIN_SIGNUP_SUCCEEDED,
  payload: { username, email, password, confirmPassword },
});

const signInSignUpFailed = ({
  username,
  email,
  password,
  confirmPassword,
}) => ({
  type: C.SIGNIN_SIGNUP_FAILED,
  payload: { username, email, password, confirmPassword },
});

const authActionsCreators = {
  signIn,
  signUp,
  signOut,
};

const authActions = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(authActionsCreators, dispatch),
  };
};

export default authActions;

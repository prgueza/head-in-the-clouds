import C from "../constants";
import { call, put, takeEvery } from "redux-saga/effects";
import { signIn, signUp } from "../../services/auth";
import { signInSignUpSucceeded, signInSignUpFailed } from "../actions/auth";

function* userSignIn({ payload }) {
  try {
    const { user, token } = yield call(signIn, payload);
    yield put(
      signInSignUpSucceeded({ user, token, keepLoggedIn: payload.keepLoggedIn })
    );
  } catch (error) {
    yield put(signInSignUpFailed({ message: error.message }));
  }
}

function* userSignUp({ payload }) {
  try {
    const { user, token } = yield call(signUp, payload);
    yield put(
      signInSignUpSucceeded({ user, token, keepLoggedIn: payload.keepLoggedIn })
    );
  } catch (error) {
    yield put(signInSignUpFailed({ message: error.message }));
  }
}

export function* SignInSaga() {
  yield takeEvery(C.SIGNIN_REQUESTED, userSignIn);
}

export function* SignUpSaga() {
  yield takeEvery(C.SIGNUP_REQUESTED, userSignUp);
}

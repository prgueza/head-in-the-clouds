import C from "../constants";
import { call, put, takeEvery } from "redux-saga/effects";
import { signIn, signUp } from "../../services/auth";

function* userSignIn({ payload }) {
  try {
    const { user, token } = yield call(signIn, payload);
    yield put({
      type: C.SIGNIN_SIGNUP_SUCCEEDED,
      payload: { user, token, keepLoggedIn: payload.keepLoggedIn },
    });
  } catch (error) {
    yield put({
      type: C.SIGNIN_SIGNUP_FAILED,
      payload: { message: error.message },
    });
  }
}

export function* SignInSaga() {
  yield takeEvery(C.SIGNIN_REQUESTED, userSignIn);
}

function* userSignUp({ payload }) {
  try {
    const { user, token } = yield call(signUp, payload);
    yield put({ type: C.SIGNIN_SIGNUP_SUCCEEDED, payload: { user, token } });
  } catch (error) {
    yield put({
      type: C.SIGNIN_SIGNUP_FAILED,
      payload: { message: error.message },
    });
  }
}

export function* SignUpSaga() {
  yield takeEvery(C.SIGNUP_REQUESTED, userSignUp);
}

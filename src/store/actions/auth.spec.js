import C from "../constants";
import {
  signIn,
  signUp,
  restore,
  signOut,
  signInSignUpFailed,
  signInSignUpSucceeded,
} from "./auth";

describe("Auth Action Creators test suite", () => {
  test("Sign in action creator returns the SIGNIN_REQUESTED action mapping args to the payload", () => {
    const payload = {
      identifier: "identifier",
      password: "password",
      keepLoggedIn: true,
    };
    const signInAction = signIn(payload);
    expect(signInAction).toStrictEqual({
      type: C.SIGNIN_REQUESTED,
      payload: {
        identifier: "identifier",
        password: "password",
        keepLoggedIn: true,
      },
    });
  });

  test("Sign out action creator returns the SIGNUP_REQUESTED action mapping args to the payload", () => {
    const payload = {
      username: "username",
      email: "email",
      password: "password",
      confirmPassword: "confirmPassword",
    };
    const signUpAction = signUp(payload);
    expect(signUpAction).toStrictEqual({
      type: C.SIGNUP_REQUESTED,
      payload: {
        username: "username",
        email: "email",
        password: "password",
        confirmPassword: "confirmPassword",
      },
    });
  });

  test.each([
    ["Sign out", C.SIGNOUT, signOut],
    ["Restore", C.RESTORE, restore],
  ])("%s action creator returns the %s action", (_, type, actionCreator) => {
    const action = actionCreator();
    expect(action).toStrictEqual({ type });
  });

  test("SignInSignUpSucceeded action creator returns the SIGNIN_SIGNUP_SUCCEEDED action mapping the args to the payload", () => {
    const signInSignUpSucceededAction = signInSignUpSucceeded({
      user: "user",
      token: "token",
      keepLoggedIn: true,
    });
    expect(signInSignUpSucceededAction).toStrictEqual({
      type: C.SIGNIN_SIGNUP_SUCCEEDED,
      payload: { user: "user", token: "token", keepLoggedIn: true },
    });
  });

  test("SignInSignUpFailed action creator returns the SIGNIN_SIGNUP_FAILED action mapping the args to the payload", () => {
    const signInSignUpFailedAction = signInSignUpFailed({
      message: "message",
    });
    expect(signInSignUpFailedAction).toStrictEqual({
      type: C.SIGNIN_SIGNUP_FAILED,
      payload: { message: "message" },
    });
  });
});

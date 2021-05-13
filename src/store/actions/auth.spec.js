import C from "../constants";
import authActions, {
  signIn,
  signUp,
  restore,
  signOut,
  signInSignUpFailed,
  signInSignUpSucceeded,
} from "./auth";

describe("Auth Action Creators test suite", () => {
  describe("Actions binding", () => {
    test.each(
      "The actions binder also returns the store dispatch method",
      () => {
        const dispatch = jest.fn();
        const bindedActions = authActions(dispatch);
        bindedActions.dispatch();
        expect(dispatch).toHaveBeenCalled();
      }
    );

    test.each([["signIn"], ["signUp"], ["restore"], ["signOut"]])(
      "The %s action is binded to the dispatch function in order to be dispatched directly",
      (action) => {
        jest.resetAllMocks();
        const dispatch = jest.fn();
        const bindedActions = authActions(dispatch);
        bindedActions[action]({});
        expect(dispatch).toHaveBeenCalled();
      }
    );
  });

  test("Sign in action creator returns the SIGNIN_REQUESTED action mapping args to the payload", () => {
    const payload = {
      identifier: "identifier",
      password: "password",
      keepLoggedIn: true,
    };
    const signInAction = signIn(payload);
    expect(signInAction).toStrictEqual({ type: C.SIGNIN_REQUESTED, payload });
  });

  test("Sign out action creator returns the SIGNUP_REQUESTED action mapping args to the payload", () => {
    const payload = {
      username: "username",
      email: "email",
      password: "password",
      confirmPassword: "confirmPassword",
    };
    const signUpAction = signUp(payload);
    expect(signUpAction).toStrictEqual({ type: C.SIGNUP_REQUESTED, payload });
  });

  test.each([
    ["Sign out", C.SIGNOUT, signOut],
    ["Restore", C.RESTORE, restore],
  ])("%s action creator returns the %s action", (_, type, actionCreator) => {
    const action = actionCreator();
    expect(action).toStrictEqual({ type });
  });

  test("SignInSignUpSucceeded action creator returns the SIGNIN_SIGNUP_SUCCEEDED action mapping the args to the payload", () => {
    const payload = { user: "user", token: "token", keepLoggedIn: true };
    const signInSignUpSucceededAction = signInSignUpSucceeded(payload);
    expect(signInSignUpSucceededAction).toStrictEqual({
      type: C.SIGNIN_SIGNUP_SUCCEEDED,
      payload,
    });
  });

  test("SignInSignUpFailed action creator returns the SIGNIN_SIGNUP_FAILED action mapping the args to the payload", () => {
    const payload = { message: "message" };
    const signInSignUpFailedAction = signInSignUpFailed(payload);
    expect(signInSignUpFailedAction).toStrictEqual({
      type: C.SIGNIN_SIGNUP_FAILED,
      payload,
    });
  });
});

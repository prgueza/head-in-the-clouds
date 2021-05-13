import authReducer, { initialState } from "./authReducer";
import C from "../constants";

describe("Auth Reducer test suite", () => {
  test("The default action is to return the state", () => {
    expect(authReducer(initialState(), {})).toEqual(initialState());
  });

  test(`The reducer sets the isLoading state to true and clears the errors with the ${C.SIGNIN_REQUESTED} action`, () => {
    const action = { type: C.SIGNIN_REQUESTED };
    expect(
      authReducer(
        { ...initialState(), error: true, errorMessage: "error" },
        action
      )
    ).toEqual({
      ...initialState(),
      isLoading: true,
      error: false,
      errorMessage: null,
    });
  });

  test(`The reducer sets the isLoading state to true and clears the errors with the ${C.SIGNUP_REQUESTED} action`, () => {
    const action = { type: C.SIGNUP_REQUESTED };
    expect(
      authReducer(
        { ...initialState(), error: true, errorMessage: "error" },
        action
      )
    ).toEqual({
      ...initialState(),
      isLoading: true,
      error: false,
      errorMessage: null,
    });
  });

  test(`The reducer resets the state to its original value with the ${C.SIGNOUT} action`, () => {
    const action = { type: C.SIGNOUT };
    expect(
      authReducer(
        {
          ...initialState(),
          error: true,
          errorMessage: "error",
          user: "user",
          isLoading: true,
          isLoggedIn: true,
          token: "token",
        },
        action
      )
    ).toEqual({
      ...initialState(),
    });
  });

  test(`The reducer sets the user information with the ${C.RESTORE} action`, () => {
    const action = {
      type: C.RESTORE,
      payload: { user: "user", token: "token" },
    };
    expect(authReducer(initialState(), action)).toEqual({
      ...initialState(),
      isLoggedIn: true,
      user: "user",
      token: "token",
    });
  });

  test(`The reducer sets the user information and clears the isLoading state with the ${C.SIGNIN_SIGNUP_SUCCEEDED} action`, () => {
    const action = {
      type: C.SIGNIN_SIGNUP_SUCCEEDED,
      payload: { user: "user", token: "token" },
    };
    expect(authReducer({ ...initialState(), isLoading: true }, action)).toEqual(
      {
        ...initialState(),
        isLoggedIn: true,
        isLoading: false,
        user: "user",
        token: "token",
      }
    );
  });

  test(`The reducer sets the user information and clears the isLoading state with the ${C.SIGNIN_SIGNUP_FAILED} action`, () => {
    const action = {
      type: C.SIGNIN_SIGNUP_FAILED,
      payload: { message: "error" },
    };
    expect(authReducer({ ...initialState(), isLoading: true }, action)).toEqual(
      {
        ...initialState(),
        isLoading: false,
        error: true,
        errorMessage: "error",
      }
    );
  });
});

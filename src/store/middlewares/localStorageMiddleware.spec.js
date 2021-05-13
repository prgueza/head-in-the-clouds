import C from "../constants";
import { localStorageMiddleware } from "./localStorageMiddleware";
import tokens from "../../utils/tokens";
jest.mock("../../utils/tokens.js");

tokens.generateToken.mockReturnValue({ token: "token" });
// const generateTokenSpy = jest
//   .spyOn(tokens, "generateToken")
//   .mockReturnValue({ token: "token" });
// const verifyTokenSpy = jest
//   .spyOn(tokens, "verifyToken")
//   .mockImplementation(() => ({ data: "username" }));

// Mock window LocalStorage API
const removeItemMock = jest.fn();
const setItemMock = jest.fn();
const getItemMock = jest.fn();

window._localStorage = {
  removeItem: removeItemMock,
  getItem: getItemMock,
  setItem: setItemMock,
};

const mockMiddleware = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => localStorageMiddleware(store)(next)(action);

  return { store, next, invoke };
};

describe("Local Storage middleware test suite", () => {
  beforeEach(() => jest.resetAllMocks());

  test("Non intercepted actions a are forwarded", () => {
    const genericAction = { type: "GENERIC_ACTION" };
    const { invoke, next } = mockMiddleware();
    invoke(genericAction);
    expect(next).toHaveBeenCalledWith(genericAction);
  });

  test("SIGNOUT | The SIGNOUT action clears the localStorage and forwards the action", () => {
    const signOutAction = { type: C.SIGNOUT };
    const { invoke, next } = mockMiddleware();
    invoke(signOutAction);
    expect(next).toHaveBeenCalledWith(signOutAction);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(
      "hitc-user-token"
    );
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(
      "hitc-api-token"
    );
  });

  test("SIGNIN_SIGNUP_SUCCEEDED | The SIGNIN_SIGNUP_SUCCEEDED action doesn't set localStorage if keepLoggedIn is false", () => {
    const signInSignUpSucceededAction = {
      type: C.SIGNIN_SIGNUP_SUCCEEDED,
      payload: { keepLoggedIn: false },
    };
    const { invoke, next } = mockMiddleware();
    invoke(signInSignUpSucceededAction);
    expect(next).toHaveBeenCalledWith(signInSignUpSucceededAction);
    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });

  test("SIGNIN_SIGNUP_SUCCEEDED | The SIGNIN_SIGNUP_SUCCEEDED action creates a token and saves it to the storage if keepLoggedIn is true", () => {
    const signInSignUpSucceededAction = {
      type: C.SIGNIN_SIGNUP_SUCCEEDED,
      payload: {
        keepLoggedIn: true,
        user: { name: "username" },
        token: "token",
      },
    };
    const { invoke, next } = mockMiddleware();
    invoke(signInSignUpSucceededAction);
    expect(tokens.generateToken).toHaveBeenCalledWith({ name: "username" });
    expect(next).toHaveBeenCalledWith(signInSignUpSucceededAction);
  });
});

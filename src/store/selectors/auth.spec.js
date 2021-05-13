import authSelectors from "./auth";
import { initialState } from "../reducers/authReducer";

describe("Auth selectors test suite", () => {
  test("The auth selectors maps the Auth state as expected", () => {
    const state = initialState();
    expect(authSelectors({ auth: state })).toStrictEqual({
      token: state.token,
      isLoading: state.isLoading,
      isLoggedIn: state.isLoggedIn,
      error: state.error,
    });
  });
});

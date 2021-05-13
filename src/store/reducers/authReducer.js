import C from "../constants";

export const initialState = () => ({
  keepLoggedIn: false,
  isLoading: false,
  isLoggedIn: false,
  user: null,
  token: null,
  error: false,
  errorMessage: null,
});

function authReducer(state = initialState(), action) {
  switch (action.type) {
    case C.SIGNIN_REQUESTED:
      return { ...state, isLoading: true, error: false, errorMessage: null };
    case C.SIGNUP_REQUESTED:
      return { ...state, isLoading: true, error: false, errorMessage: null };
    case C.SIGNOUT:
      return initialState();
    case C.RESTORE:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload?.user,
        token: action.payload?.token,
      };
    case C.SIGNIN_SIGNUP_SUCCEEDED:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case C.SIGNIN_SIGNUP_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
}

export default authReducer;

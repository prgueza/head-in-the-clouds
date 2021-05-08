import C from "../constants";

const initialState = () => ({
  keepLoggedIn: false,
  isLoading: false,
  isLoggedIn: false,
  user: null,
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
      return { ...state, isLoggedIn: false, user: null };
    case C.SIGNIN_SIGNUP_SUCCEEDED:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        user: action.payload.user,
      };
    case C.SIGNIN_SIGNUP_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        user: null,
        error: true,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
}

export default authReducer;

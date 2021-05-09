import C from "../constants";

const initialState = () => ({
  isLoading: false,
  error: null,
  query: "",
  towns: [],
  selectedTowns: [],
});

function townsReducer(state = initialState(), action) {
  switch (action.type) {
    case C.TOWNS_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case C.TOWNS_QUERIED:
      return { ...state, query: action.payload.query };
    case C.TOWNS_SELECTED:
      return {
        ...state,
        selectedTowns: action.payload.selectedTowns,
      };
    case C.TOWNS_FETCH_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        towns: action.payload.towns,
      };
    case C.TOWNS_FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export default townsReducer;

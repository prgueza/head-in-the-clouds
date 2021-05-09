import C from "../constants";

const initialState = () => ({
  isLoading: false,
  error: null,
  query: "",
  locations: [],
  selectedLocations: [],
});

function locationsReducer(state = initialState(), action) {
  switch (action.type) {
    case C.LOCATIONS_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case C.LOCATIONS_QUERIED:
      return { ...state, query: action.payload.query };
    case C.LOCATIONS_SELECTED:
      return {
        ...state,
        selectedLocations: action.payload.selectedLocations,
      };
    case C.LOCATIONS_FETCH_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        locations: action.payload.locations,
      };
    case C.LOCATIONS_FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export default locationsReducer;

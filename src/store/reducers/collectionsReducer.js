import C from "../constants";

const initialState = () => ({
  isLoading: false,
  error: null,
  query: "",
  collections: [],
});

function collectionsReducer(state = initialState(), action) {
  switch (action.type) {
    case C.COLLECTIONS_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case C.COLLECTIONS_QUERIED:
      return { ...state, query: action.payload.query };
    case C.COLLECTIONS_FETCH_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        collections: action.payload.collections,
      };
    case C.COLLECTIONS_FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export default collectionsReducer;

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
    case C.COLLECTION_POST_REQUESTED:
      return { ...state, isLoading: true };
    case C.COLLECTION_DELETE_REQUESTED:
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
    case C.COLLECTION_POST_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        collections: [...state.collections, action.payload.collection],
      };
    case C.COLLECTION_POST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case C.COLLECTION_DELETE_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        collections: state.collections.filter(
          ({ _id }) => _id !== action.payload.collection._id
        ),
      };
    case C.COLLECTION_DELETE_FAILED:
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

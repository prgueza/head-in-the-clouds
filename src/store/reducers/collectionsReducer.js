import C from "../constants";

export const initialState = () => ({
  isLoading: false,
  error: null,
  draft: null,
  list: [],
});

function collectionsReducer(state = initialState(), action) {
  switch (action.type) {
    case C.COLLECTION_SET:
      return { ...state, list: action.payload.collection };
    case C.COLLECTIONS_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case C.COLLECTIONS_REORDER_REQUESTED:
      return {
        ...state,
        isLoading: true,
        draft: state.list,
        list: action.payload.collections,
      };
    case C.COLLECTION_POST_REQUESTED:
      return { ...state, isLoading: true };
    case C.COLLECTION_DELETE_REQUESTED:
      return { ...state, isLoading: true };
    case C.COLLECTION_ADD_PLACE_REQUESTED:
      return { ...state, isLoading: true };
    case C.COLLECTION_DELETE_PLACE_REQUESTED:
      return { ...state, isLoading: true };
    case C.COLLECTIONS_REORDER_SUCCEEDED:
      return { ...state, isLoading: false, draft: null };
    case C.COLLECTIONS_REORDER_FAILED:
      return { ...state, isLoading: false, list: state.draft, draft: null };
    case C.COLLECTIONS_FETCH_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        list: action.payload.collections,
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
        list: [...state.list, action.payload.collection],
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
        list: state.list.filter(
          ({ _id }) => _id !== action.payload.collection._id
        ),
      };
    case C.COLLECTION_DELETE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case C.COLLECTION_ADD_PLACE_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((collection) =>
          collection._id === action.payload.collection._id
            ? {
                ...collection,
                places: [...collection.places, action.payload.place],
              }
            : collection
        ),
      };
    case C.COLLECTION_ADD_PLACE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case C.COLLECTION_DELETE_PLACE_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((collection) =>
          collection._id === action.payload.collection._id
            ? {
                ...collection,
                places: collection.places.filter(
                  ({ _id }) => _id !== action.payload.place._id
                ),
              }
            : collection
        ),
      };
    case C.COLLECTION_DELETE_PLACE_FAILED:
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

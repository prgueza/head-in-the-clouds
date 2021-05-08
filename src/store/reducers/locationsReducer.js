const initialState = () => ({
  locations: [],
  selectedLocations: [],
  collections: [],
  selectedColection: null,
});

function locationsReducer(state = initialState(), action) {
  switch (action.type) {
    case "LOCATION_SELECTED":
      return { ...state, selectedLocations: action.payload.selectedLocations };
    case "LOCATION_FETCH_REQUESTED":
      return state;
    case "LOCATION_FETCH_SUCCEEDED":
      return { ...state, locations: action.payload.locations };
    case "LOCATION_FETCH_FAILED":
      return state;
    case "SET_CURRENT_COLLECTION":
      const collection =
        state.collections.find(
          (collection) => collection.id === action.payload.collectionId
        ) || {};
      return { ...state, collection };
    default:
      return state;
  }
}

export default locationsReducer;

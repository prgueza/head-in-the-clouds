import { createSelector } from "reselect";

const locations = (state) => state.locations.locations;
const query = (state) => state.locations.query;

const filteredLocations = createSelector(
  locations,
  query,
  (locations, query) => {
    if (!query.length) return [];
    const queryRegex = new RegExp(query.trim().toLowerCase());
    const results = locations.filter(({ name }) =>
      queryRegex.test(name.trim().toLowerCase())
    );
    return query.length < 3 && results.length > 50
      ? results.slice(0, 10)
      : results;
  }
);

const locationsSelectors = (state) => {
  return {
    filteredLocations: filteredLocations(state),
    isLoading: state.locations.isLoading,
    locations: state.locations.locations,
    selectedLocations: state.locations.selectedLocations,
  };
};

export default locationsSelectors;

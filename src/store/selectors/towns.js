import { createSelector } from "reselect";

const towns = (state) => state.towns.towns;
const query = (state) => state.towns.query;

const filteredTowns = createSelector(towns, query, (towns, query) => {
  if (!query.length) return [];

  const queryRegex = new RegExp(query.trim().toLowerCase());
  const results = towns.filter(({ name }) =>
    queryRegex.test(name.trim().toLowerCase())
  );
  return query.length < 3 && results.length > 50
    ? results.slice(0, 10)
    : results;
});

const townsSelectors = (state) => {
  return {
    filteredTowns: filteredTowns(state),
    isLoading: state.towns.isLoading,
    towns: state.towns.towns,
    selectedTowns: state.towns.selectedTowns,
  };
};

export default townsSelectors;

import { createSelector } from "reselect";

const towns = (state) => state.towns.towns;
const query = (state) => state.towns.query;

const filteredTowns = createSelector(towns, query, (towns, query) => {
  if (!query.length) return towns.slice(0, 20);
  const queryRegex = new RegExp(query.trim().toLowerCase());
  const matches = towns.filter(({ name }) =>
    queryRegex.test(name.trim().toLowerCase())
  );
  // For short queries the matches array might still be too big so we slice it
  return query.length < 3 && matches.length > 50
    ? matches.slice(0, 20)
    : matches;
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

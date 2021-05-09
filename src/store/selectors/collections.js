import { createSelector } from "reselect";

const collections = (state) => state.collections.collections;
const query = (state) => state.collections.query;

const filteredCollections = createSelector(
  collections,
  query,
  (collections, query) => {
    if (!query.length) return collections;
    const queryRegex = new RegExp(query.trim().toLowerCase());
    return collections.filter(({ name }) =>
      queryRegex.test(name.trim().toLowerCase())
    );
  }
);

const collectionsSelectors = (state) => {
  return {
    filteredCollections: filteredCollections(state),
    isLoading: state.collections.isLoading,
    collections: state.collections.collections,
  };
};

export default collectionsSelectors;

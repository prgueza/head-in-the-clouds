const getCollectionFromRoute = (state, props) => {
  return state.collections.list.find(
    ({ _id }) => _id === props.location?.collection?._id
  );
};

const collectionsSelectors = (state, props) => {
  return {
    collectionFromRoute: getCollectionFromRoute(state, props),
    isLoading: state.collections.isLoading,
    collections: state.collections.list,
  };
};

export default collectionsSelectors;

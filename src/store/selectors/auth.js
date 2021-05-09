const locationsSelectors = (state) => {
  return {
    token: state.auth.token,
  };
};

export default locationsSelectors;

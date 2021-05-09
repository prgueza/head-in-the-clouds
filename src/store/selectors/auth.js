const authSelectors = (state) => {
  return {
    token: state.auth.token,
  };
};

export default authSelectors;

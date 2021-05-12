const authSelectors = (state) => {
  return {
    token: state.auth.token,
    isLoading: state.auth.isLoading,
    error: state.auth.error,
  };
};

export default authSelectors;

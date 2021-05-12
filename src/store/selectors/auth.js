const authSelectors = (state) => {
  return {
    token: state.auth.token,
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
  };
};

export default authSelectors;

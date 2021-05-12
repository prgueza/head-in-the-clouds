import React, { useContext, createContext } from "react";
import { useSelector } from "react-redux";

export const authContext = createContext();

export function IomAuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuthContext = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return {
    user,
    token,
    isLoggedIn,
  };
}

import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../providers/IomAuthProvider";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const auth = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoggedIn ? render(props) : <Redirect to="/auth/login" />
      }
    />
  );
};

export default ProtectedRoute;

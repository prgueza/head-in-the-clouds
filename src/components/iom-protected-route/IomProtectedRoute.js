import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../providers/IomAuthProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

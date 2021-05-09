import { Route } from "react-router-dom";
import IomProtectedRoute from "../iom-protected-route/IomProtectedRoute";

const IomRoute = (route) => {
  const RouteComponent = route.protected ? IomProtectedRoute : Route;

  return (
    <RouteComponent
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.children} />}
    />
  );
};

export default IomRoute;

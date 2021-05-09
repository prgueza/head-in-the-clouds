import { Switch } from "react-router-dom";
import IomRoute from "../../components/iom-route/IomRoute";

const IomRouteView = ({ routes }) => (
  <Switch>
    {routes.map((route) => (
      <IomRoute key={route.name} {...route} />
    ))}
  </Switch>
);

export default IomRouteView;

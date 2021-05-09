import IomWeatherView from "../views/iom-weather-view/IomWeatherView";
import IomLoginView from "../views/iom-login-view/IomLoginView";
import IomCollectionsView from "../views/iom-collections-view/IomCollectionsView";
import IomLocationsView from "../views/iom-locations-view/IomLocationsView";
import IomRouteView from "../views/iom-route-view/IomRouteView";

const routes = [
  {
    name: "home",
    path: "/",
    exact: true,
    redirect: "/weather",
  },
  {
    name: "auth",
    path: "/auth",
    component: IomLoginView,
  },
  {
    name: "weather",
    path: "/weather",
    component: IomWeatherView,
  },
  {
    name: "collections-locations",
    path: "/collections",
    component: IomRouteView,
    protected: true,
    children: [
      {
        name: "locations",
        path: "/collections",
        component: IomCollectionsView,
        exact: true,
      },
      {
        name: "locations",
        path: "/collections/:id/locations",
        component: IomLocationsView,
      },
    ],
  },
];

export default routes;

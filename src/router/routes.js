import IomWeatherView from "../views/iom-weather-view/IomWeatherView";
import IomLoginView from "../views/iom-login-view/IomLoginView";
import IomCollectionsView from "../views/iom-collections-view/IomCollectionsView";
import IomPlacesView from "../views/iom-places-view/IomPlacesView";
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
    name: "collections-places",
    path: "/collections",
    component: IomRouteView,
    protected: true,
    children: [
      {
        name: "collections",
        path: "/collections",
        component: IomCollectionsView,
        exact: true,
      },
      {
        name: "places",
        path: "/collections/:id/places",
        component: IomPlacesView,
      },
    ],
  },
];

export default routes;

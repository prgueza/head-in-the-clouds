import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

// Elastic UI Components
import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
} from "@elastic/eui";

// Components
import IomUserMenu from "../../components/iom-user-menu/IomUserMenu";

function IomNavigation() {
  const sections = [
    {
      items: [<EuiHeaderLogo>Whats the weather like?</EuiHeaderLogo>],
      borders: "right",
    },
    {
      items: [
        <EuiHeaderLinks aria-label="Navigation links">
          <Link to="/weather">
            <EuiHeaderLink
              iconType="search"
              isActive={!!useRouteMatch("/weather")}
            >
              Browse weather
            </EuiHeaderLink>
          </Link>
          <Link to="/collections">
            <EuiHeaderLink
              iconType="grid"
              isActive={!!useRouteMatch("/collections")}
            >
              Collections
            </EuiHeaderLink>
          </Link>
        </EuiHeaderLinks>,
        <IomUserMenu />,
      ],
    },
  ];
  return <EuiHeader sections={sections} />;
}

export default IomNavigation;

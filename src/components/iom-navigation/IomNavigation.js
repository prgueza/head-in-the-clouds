import React from "react";

// Styles
import "./IomNavigation.scss";

// Elastic UI Components
import { EuiHeader, EuiIcon, EuiTitle } from "@elastic/eui";

// Components
import IomUserMenu from "../../components/iom-user-menu/IomUserMenu";
import IomNavigationLinks from "../../components/iom-navigation-links/IomNavigationLinks";

function IomNavigation() {
  const sections = [
    {
      items: [
        <EuiTitle size="xs">
          <h1 className="iom-navigation__title">
            <EuiIcon
              className="iom-navigation__title-icon"
              type="lensApp"
              size="l"
            />
            Whats the weather like?
          </h1>
        </EuiTitle>,
      ],
      borders: "right",
    },
    {
      items: [<IomNavigationLinks />, <IomUserMenu />],
    },
  ];
  return <EuiHeader position="fixed" sections={sections} />;
}

export default IomNavigation;

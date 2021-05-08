import React from "react";

// Elastic UI Components
import { EuiHeader, EuiHeaderLogo } from "@elastic/eui";

// Components
import IomUserMenu from "../../components/iom-user-menu/IomUserMenu";

function IomNavigation() {
  const sections = [
    {
      items: [<EuiHeaderLogo>Whats the weather like?</EuiHeaderLogo>],
      borders: "right",
    },
    {
      items: [<IomUserMenu />],
    },
  ];
  return <EuiHeader sections={sections} />;
}

export default IomNavigation;

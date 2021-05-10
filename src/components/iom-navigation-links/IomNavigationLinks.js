import React from "react";
import { Link, useLocation } from "react-router-dom";

//Styles
import "./IomNavigationLinks.scss";

// Utilities
import { useAuthContext } from "../../providers/IomAuthProvider";

// Elastic UI Components
import { EuiHeaderLinks, EuiHeaderLink } from "@elastic/eui";

const IomNavigationLinks = () => {
  const auth = useAuthContext();
  const location = useLocation();

  return (
    <EuiHeaderLinks aria-label="Navigation links">
      <Link to="/weather">
        <EuiHeaderLink
          className="iom-navigation__link"
          iconType="search"
          isActive={location.pathname.startsWith("/weather")}
        >
          Browse weather
        </EuiHeaderLink>
      </Link>
      {auth.isLoggedIn ? (
        <Link to="/collections">
          <EuiHeaderLink
            className="iom-navigation__link"
            iconType="list"
            isActive={location.pathname.startsWith("/collections")}
          >
            Collections
          </EuiHeaderLink>
        </Link>
      ) : (
        <Link to="/auth/login">
          <EuiHeaderLink
            className="iom-navigation__link"
            iconType="user"
            isActive={location.pathname.startsWith("/auth")}
          >
            Log in
          </EuiHeaderLink>
        </Link>
      )}
    </EuiHeaderLinks>
  );
};

export default IomNavigationLinks;

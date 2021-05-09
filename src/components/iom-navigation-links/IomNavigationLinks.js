import React from "react";
import { Link, useLocation } from "react-router-dom";

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
          iconType="search"
          isActive={location.pathname.startsWith("/weather")}
        >
          Browse weather
        </EuiHeaderLink>
      </Link>
      {auth.isLoggedIn ? (
        <Link to="/collections">
          <EuiHeaderLink
            iconType="grid"
            isActive={location.pathname.startsWith("/collections")}
          >
            Collections
          </EuiHeaderLink>
        </Link>
      ) : (
        <Link to="/auth/login">
          <EuiHeaderLink
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

import "./IomAuthPanel.scss";
import React from "react";
import {
  BrowserRouter as Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

// Utilities
import { useAuthContext } from "../../providers/IomAuthProvider";

// Elastic UI Components
import { EuiPanel } from "@elastic/eui";

// Components
import IomSigninForm from "../iom-signin-form/IomSigninForm";
import IomSignupForm from "../iom-signup-form/IomSignupForm";

function IomAuthPanel() {
  const auth = useAuthContext();
  const { path } = useRouteMatch();
  return auth.isLoggedIn ? (
    <Redirect to="/weather" />
  ) : (
    <div className="iom-auth-panel">
      <EuiPanel paddingSize="l">
        <Switch>
          <Route exact path={`${path}/login`}>
            <IomSigninForm isLoading={auth.isLoading} />
          </Route>
          <Route exact path={`${path}/signup`}>
            <IomSignupForm isLoading={auth.isLoading} />
          </Route>
        </Switch>
      </EuiPanel>
    </div>
  );
}

export default IomAuthPanel;

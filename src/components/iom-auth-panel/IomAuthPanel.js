import "./IomAuthPanel.scss";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  BrowserRouter as Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

// Selectors and Actions
import authSelectors from "../../store/selectors/auth";
import authActions from "../../store/actions/auth";

// Elastic UI Components
import { EuiPanel } from "@elastic/eui";

// Components
import IomSigninForm from "../iom-signin-form/IomSigninForm";
import IomSignupForm from "../iom-signup-form/IomSignupForm";

/*
IomAuthPanel

This component is in charge of handling the login and signup to the application. It renders
the forms regarding the route path and provides them with both the action they have to call
back and the isLoading property from the Auth Store.
*/

function IomAuthPanel({ isLoggedIn, isLoading, signIn, signUp }) {
  const { path } = useRouteMatch();
  return isLoggedIn ? (
    <Redirect to="/weather" />
  ) : (
    <div className="iom-auth-panel">
      <EuiPanel paddingSize="l">
        <Switch>
          <Route exact path={`${path}/login`}>
            <IomSigninForm isLoading={isLoading} signIn={signIn} />
          </Route>
          <Route exact path={`${path}/signup`}>
            <IomSignupForm isLoading={isLoading} signUp={signUp} />
          </Route>
        </Switch>
      </EuiPanel>
    </div>
  );
}

export default connect(authSelectors, authActions)(IomAuthPanel);

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import IomMainView from "../iom-main-view/IomMainView";
import IomLoginView from "../iom-login-view/IomLoginView";

function IomWrapper() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Switch>
        <Route exact path="/">
          <IomMainView />
        </Route>
        <Route path="/login">
          <IomLoginView />
        </Route>
      </Switch>
    </Router>
  );
}

export default IomWrapper;

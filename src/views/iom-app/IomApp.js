import "./IomApp.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// Components
import IomWeatherView from "../iom-weather-view/IomWeatherView";
import IomNavigation from "../../components/iom-navigation/IomNavigation";
import IomLoginView from "../iom-login-view/IomLoginView";
import ProtectedRoute from "../../components/iom-protected-route/IomProtectedRoute";

class IomApp extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <IomNavigation />
        <section className="app">
          <Switch>
            <ProtectedRoute path="/weather" component={IomWeatherView} />
            <Route path="/auth" component={IomLoginView} />
          </Switch>
        </section>
      </Router>
    );
  }
}

export default connect()(IomApp);

import "./IomApp.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";

// Actions
import authActions from "../../store/actions/auth";

// Components
import IomBackground from "../../components/iom-background/IomBackground";
import IomWeatherView from "../iom-weather-view/IomWeatherView";
import IomNavigation from "../../components/iom-navigation/IomNavigation";
import IomLoginView from "../iom-login-view/IomLoginView";
import ProtectedRoute from "../../components/iom-protected-route/IomProtectedRoute";

const THEMES = [
  { theme: "dawn", from: 0, to: 10 },
  { theme: "day", from: 10, to: 15 },
  { theme: "sunset", from: 15, to: 20 },
  { theme: "night", from: 20, to: 24 },
];
class IomApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeCheckInterval: null,
    };
    this.themeCheck = this.themeCheck.bind(this);
    this.themeCheck();
  }

  componentDidMount() {
    this.props.restore();
    const interval = setInterval(() => this.themeCheck(), 5000);
    this.setState({ themeCheckInterval: interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.themeCheckInterval);
  }

  themeCheck() {
    const { theme } = THEMES.find(({ from, to }) => from < dayjs().hour() < to);
    const body = document.querySelector("body");
    body.classList.forEach(
      (className) => /theme/.test(className) && body.classList.remove(className)
    );
    body.classList.add(`theme--${theme}`);
  }

  render() {
    return (
      <Router>
        <IomBackground />
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

export default connect(null, authActions)(IomApp);

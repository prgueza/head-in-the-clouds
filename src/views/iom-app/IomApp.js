import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";

// Actions
import authActions from "../../store/actions/auth";

// Routes
import routes from "../../router/routes";

// Components
import IomBackground from "../../components/iom-background/IomBackground";
import IomNavigation from "../../components/iom-navigation/IomNavigation";
import IomRoute from "../../components/iom-route/IomRoute";
import IomToastsList from "../../components/iom-toasts-list/IomToastsList";

dayjs().hour();

/*
  Theme changes dinamically depending on the hour 
*/
const THEMES = [
  { theme: "dawn", from: 4, to: 10 },
  { theme: "day", from: 10, to: 16 },
  { theme: "sunset", from: 16, to: 22 },
  { theme: "night", from: 22, to: 24 },
  { theme: "night", from: 0, to: 4 },
];
class IomApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "day",
      themeCheckInterval: null,
    };
    this.themeCheck = this.themeCheck.bind(this);
  }

  componentDidMount() {
    this.props.restore();
    // Call themeCheck once to set theme and then schedule subsequent calls to update
    // the theme if necessary
    this.themeCheck();
    const interval = setInterval(() => this.themeCheck(), 5000);
    this.setState({ themeCheckInterval: interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.themeCheckInterval);
  }

  /*
    For simplicity, we are only using css vars as the way to manage theme changes.
    Ideally we would also build a theme provider (similar to the auth provider
    we use) to let the components react regarding the theme context.
    As this application is pretty basic there was no need for this kind of
    solution. Theme only changes a few styles.
  */
  themeCheck() {
    const hour = dayjs().hour();
    const { theme } = THEMES.find(
      ({ from, to }) => hour >= from && hour < to
    ) || { theme: "day" };
    const body = document.querySelector("body");
    if (!body.classList.contains(`theme--${theme}`)) {
      body.classList.remove(`theme--${this.state.theme}`);
      body.classList.add(`theme--${theme}`);
      this.setState({ theme });
    }
  }

  render() {
    return (
      <Router>
        <IomBackground />
        <IomToastsList />
        <IomNavigation />
        <section className="app">
          <Switch>
            {routes.map((route) => (
              <IomRoute key={route.name} {...route}></IomRoute>
            ))}
          </Switch>
        </section>
      </Router>
    );
  }
}

export default connect(null, authActions)(IomApp);

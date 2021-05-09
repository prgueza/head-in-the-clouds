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
      theme: "day",
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
    const hour = dayjs().hour();
    const { theme } = THEMES.find(({ from, to }) => hour > from && hour <= to);
    const body = document.querySelector("body");
    if (theme !== this.state.theme) {
      body.classList.remove(`theme--${this.state.theme}`);
      body.classList.add(`theme--${theme}`);
      this.setState({ theme });
    }
  }

  render() {
    return (
      <Router>
        <IomBackground />
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

import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Api
import { getWeatherByPlace } from "../../services/weather";

// Selectors
import collectionsSelectors from "../../store/selectors/collections";

// Styles
import "./IomPlaceCard.scss";

// Elastic UI Components
import { EuiCard, EuiIcon, EuiLoadingChart, EuiTitle } from "@elastic/eui";

// Components
import IomTemperatureChart from "../iom-temperature-chart/IomTemperatureChart";
import IomPlaceCardStats from "../iom-place-card-stats/IomPlaceCardStats";
import IomPlaceCardActions from "../iom-place-card-actions/IomPlaceCardActions";

class IomPlaceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      temperature: 0,
      rainChance: 0,
      rainPredictions: { values: [], units: "" },
      predictions: [],
      request: axios.CancelToken.source(),
      icon: "cloudSunny",
    };
    this.getWeatherInformation = this.getWeatherInformation.bind(this);
    this.setIcon = this.setIcon.bind(this);
  }

  componentDidMount() {
    this.getWeatherInformation();
  }

  componentWillUnmount() {
    this.state.request.cancel();
  }

  setIcon({ temperature, rainChance }) {
    if (rainChance.value > 20 && temperature.current?.value < 15) {
      this.setState({ icon: "cloudStormy" });
    } else if (rainChance.value > 20) {
      this.setState({ icon: "cloudDrizzle" });
    } else {
      this.setState({ icon: "cloudSunny" });
    }
  }

  async getWeatherInformation() {
    try {
      this.setState({ isLoading: true });
      const {
        temperature,
        rainChance,
        rainPredictions,
        predictions,
      } = await getWeatherByPlace(
        {
          code: this.props.place.code,
          countycode: this.props.place.countycode,
        },
        { cancelToken: this.state.request.token }
      );
      this.setState({ temperature, rainChance, predictions, rainPredictions });
      this.setIcon({ temperature, rainChance });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => this.setState({ isLoading: false }), 500);
    }
  }

  render() {
    return (
      <EuiCard
        className="iom-place-card"
        icon={<EuiIcon size="xxl" type={this.state.icon} />}
        textAlign="center"
        title={
          <EuiTitle className="iom-place-card__title" size="l">
            <h1>{this.props.place.name}</h1>
          </EuiTitle>
        }
      >
        <div className="iom-place-card__actions">
          <IomPlaceCardActions
            collection={this.props.collectionFromRoute}
            place={this.props.place}
            onRefresh={this.getWeatherInformation}
          />
        </div>
        <div className="iom-place-card__stats-container">
          <IomPlaceCardStats
            isLoading={this.state.isLoading}
            temperature={this.state.temperature}
            rainChance={this.state.rainChance}
            rainPredictions={this.state.rainPredictions}
          />
        </div>
        <div className="iom-place-card__chart-container">
          {this.state.isLoading ? (
            <EuiLoadingChart size="xl" />
          ) : (
            <IomTemperatureChart predictions={this.state.predictions} />
          )}
        </div>
      </EuiCard>
    );
  }
}

export default withRouter(connect(collectionsSelectors)(IomPlaceCard));

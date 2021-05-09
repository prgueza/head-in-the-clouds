import React from "react";
import axios from "axios";

// Api
import { getWeatherByLocation } from "../../services/weather";

// Styles
import "./IomLocationCard.scss";

// Elastic UI Components
import { EuiCard, EuiIcon, EuiLoadingChart } from "@elastic/eui";

// Components
import IomTemperatureChart from "../iom-temperature-chart/IomTemperatureChart";
import IomLocationCardStats from "../iom-location-card-stats/IomLocationCardStats";

class IomLocationCard extends React.Component {
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
      } = await getWeatherByLocation(
        {
          code: this.props.location.code,
          countyCode: this.props.location.countyCode,
        },
        { cancelToken: this.state.request.token }
      );
      this.setState({ temperature, rainChance, predictions, rainPredictions });
      this.setIcon({ temperature, rainChance });
      console.log(this.state);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <EuiCard
        icon={<EuiIcon size="xxl" type={this.state.icon} />}
        textAlign="center"
        title={this.props.location.label}
      >
        <div className="iom-card__stats-container">
          <IomLocationCardStats
            isLoading={this.state.isLoading}
            temperature={this.state.temperature}
            rainChance={this.state.rainChance}
            rainPredictions={this.state.rainPredictions}
          />
        </div>
        <div className="iom-card__chart-container">
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

export default IomLocationCard;

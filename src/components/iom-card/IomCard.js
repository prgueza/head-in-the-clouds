import React from "react";
import axios from "axios";

// Api
import { getWeatherByLocation } from "../../services/weather";

// Elastic UI Components
import {
  EuiCard,
  EuiIcon,
  EuiStat,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";

// Components
import IomTemperatureChart from "../iom-temperature-chart/IomTemperatureChart";

class IomCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isLoading: true,
      temperature: 0,
      rainChance: 0,
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

  setIcon() {
    if (this.state.rainChance > 20 && this.state.temp < 15) {
      this.setState({ icon: "cloudDrizzle" });
    } else if (this.state.rainChance > 20) {
      this.setState({ icon: "cloudDrizzle" });
    } else {
      this.setState({ icon: "cloudDrizzle" });
    }
  }

  async getWeatherInformation() {
    try {
      this.setState({ isLoading: true });
      const { temperature, rainChance } = await getWeatherByLocation(
        {
          code: this.props.location.code,
          countyCode: this.props.location.countyCode,
        },
        { cancelToken: this.state.request.token }
      );
      this.setIcon();
      this.setState({ temperature, rainChance });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <EuiCard
        layout="horizontal"
        icon={<EuiIcon size="xxl" type={this.state.icon} />}
        textAlign="center"
        title={this.props.location.label}
      >
        <EuiFlexGroup gutterSize="l">
          <EuiFlexItem grow={false}>
            <EuiStat
              textAlign="left"
              title={`${this.state.temperature?.current || "-"} ºC`}
              description="Temperature"
              isLoading={this.state.isLoading}
            ></EuiStat>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiStat
              textAlign="left"
              title={`${this.state.rainChance || "-"} %`}
              description="Rain chance"
              isLoading={this.state.isLoading}
            ></EuiStat>
          </EuiFlexItem>
        </EuiFlexGroup>
        <IomTemperatureChart />
      </EuiCard>
    );
  }
}

export default IomCard;

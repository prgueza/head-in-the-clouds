import React from "react";

// Styles
import "./IomLocationsView.scss";

// Elastic UI Components
import { EuiFlexGrid, EuiTitle, EuiFlexItem } from "@elastic/eui";

class IomLocationsView extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section className="weather">
        <div className="weather__header">
          <EuiTitle size="l" className="weather__header-title">
            <h1>Locations</h1>
          </EuiTitle>
        </div>
        <div className="weather__content">
          <EuiFlexGrid columns={3} gutterSize="xl">
            <EuiFlexItem></EuiFlexItem>
          </EuiFlexGrid>
        </div>
      </section>
    );
  }
}

export default IomLocationsView;

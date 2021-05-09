import React from "react";
import "./IomWeatherView.css";
import { connect } from "react-redux";

// Selectors
import locationsSelectors from "../../store/selectors/locations";

// Elastic UI Components
import { EuiFlexGrid, EuiFlexItem, EuiTitle } from "@elastic/eui";

// Components
import IomCard from "../../components/iom-card/IomCard";
import IomLocationPicker from "../../components/iom-location-picker/IomLocationPicker";

function IomWeatherView({ selectedLocations }) {
  return (
    <section className="weather">
      <div className="weather__header">
        <EuiTitle size="l" className="weather__header-title">
          <h1>Whats the weather like at?</h1>
        </EuiTitle>
        <IomLocationPicker />
      </div>
      <div className="weather__content">
        <EuiFlexGrid columns={3} gutterSize="xl">
          {selectedLocations.map((location) => (
            <EuiFlexItem key={location.label}>
              <IomCard location={location}></IomCard>
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      </div>
    </section>
  );
}

export default connect(locationsSelectors)(IomWeatherView);

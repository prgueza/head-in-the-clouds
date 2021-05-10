import React from "react";
import { connect } from "react-redux";

// Selectors
import townsSelectors from "../../store/selectors/towns";

// Elastic UI Components
import { EuiFlexGroup, EuiFlexItem, EuiTitle } from "@elastic/eui";

// Components
import IomPlaceCard from "../../components/iom-place-card/IomPlaceCard";
import IomTownPicker from "../../components/iom-town-picker/IomTownPicker";

function IomWeatherView({ selectedTowns }) {
  return (
    <section className="iom-section">
      <div className="iom-section__header">
        <EuiTitle size="l" className="iom-section__header-title">
          <h1>Is your head in the clouds?</h1>
        </EuiTitle>
        <IomTownPicker />
      </div>
      <div className="iom-section__content-wrapper">
        <div className="iom-section__content">
          <EuiFlexGroup wrap columns={4} gutterSize="xl">
            {selectedTowns.map((town) => (
              <EuiFlexItem key={town.name}>
                <IomPlaceCard place={town}></IomPlaceCard>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </div>
      </div>
    </section>
  );
}

export default connect(townsSelectors)(IomWeatherView);

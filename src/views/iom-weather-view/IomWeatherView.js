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
          <h1>Browse the weather</h1>
        </EuiTitle>
        <IomTownPicker />
      </div>
      <div className="iom-section__content-wrapper">
        <div className="iom-section__content">
          <EuiFlexGroup wrap gutterSize="xl" justifyContent="center">
            {selectedTowns.map((town) => (
              <EuiFlexItem
                className="iom-section__content-item"
                key={town.name}
              >
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

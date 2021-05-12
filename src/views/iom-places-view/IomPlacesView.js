import React from "react";
import { connect } from "react-redux";

// Selectors and Actions
import collectionsSelectors from "../../store/selectors/collections";
import collectionsActions from "../../store/actions/collections";

// Elastic UI Components
import { EuiFlexGroup, EuiTitle, EuiFlexItem } from "@elastic/eui";

// Components
import IomPlaceCard from "../../components/iom-place-card/IomPlaceCard";

const IomPlacesView = ({ collectionFromRoute }) => {
  return (
    <section className="iom-section">
      <div className="iom-section__header">
        <EuiTitle size="l" className="iom-section__header-title">
          <h1>{collectionFromRoute.name}</h1>
        </EuiTitle>
      </div>
      <div className="iom-section__content-wrapper">
        <div className="iom-section__content">
          <EuiFlexGroup wrap columns={4} gutterSize="xl">
            {collectionFromRoute?.places.map((place) => (
              <EuiFlexItem key={place.name}>
                <IomPlaceCard
                  place={place}
                  collection={collectionFromRoute}
                ></IomPlaceCard>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </div>
      </div>
    </section>
  );
};

export default connect(collectionsSelectors, collectionsActions)(IomPlacesView);

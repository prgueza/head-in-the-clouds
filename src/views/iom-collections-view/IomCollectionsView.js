import React from "react";
import { connect } from "react-redux";

// Styles
import "./IomCollectionsView.scss";

// Actions and Selectors
import collectionsActions from "../../store/actions/collections";
import collectionsSelectors from "../../store/selectors/collections";

// Elastic UI Components
import { EuiFlexGrid, EuiTitle, EuiFlexItem } from "@elastic/eui";

// Components
import IomCollectionCard from "../../components/iom-collection-card/IomCollectionCard";

class IomCollectionsView extends React.Component {
  componentDidMount() {
    this.props.getCollections();
  }

  render() {
    return (
      <section className="weather">
        <div className="weather__header">
          <EuiTitle size="l" className="weather__header-title">
            <h1>Collections</h1>
          </EuiTitle>
        </div>
        <div className="weather__content">
          <EuiFlexGrid columns={3} gutterSize="xl">
            {this.props.filteredCollections.map((collection) => (
              <EuiFlexItem key={collection._id}>
                <IomCollectionCard collection={collection}></IomCollectionCard>
              </EuiFlexItem>
            ))}
          </EuiFlexGrid>
        </div>
      </section>
    );
  }
}

export default connect(
  collectionsSelectors,
  collectionsActions
)(IomCollectionsView);

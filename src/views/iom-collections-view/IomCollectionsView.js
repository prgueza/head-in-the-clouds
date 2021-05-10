import React from "react";
import { connect } from "react-redux";

// Styles
import "./IomCollectionsView.scss";

// Actions and Selectors
import collectionsActions from "../../store/actions/collections";
import collectionsSelectors from "../../store/selectors/collections";

// Elastic UI Components
import { EuiFlexGroup, EuiTitle, EuiFlexItem } from "@elastic/eui";

// Components
import IomCollectionCard from "../../components/iom-collection-card/IomCollectionCard";

class IomCollectionsView extends React.Component {
  componentDidMount() {
    this.props.getCollections();
  }

  render() {
    return (
      <section className="iom-section">
        <div className="iom-section__header">
          <EuiTitle size="l" className="iom-section__header-title">
            <h1>My collections</h1>
          </EuiTitle>
        </div>
        <div className="iom-section__content-wrapper">
          <div className="iom-section__content">
            <EuiFlexGroup wrap columns={4} gutterSize="xl">
              {this.props.filteredCollections.map((collection) => (
                <EuiFlexItem key={collection._id}>
                  <IomCollectionCard
                    collection={collection}
                  ></IomCollectionCard>
                </EuiFlexItem>
              ))}
            </EuiFlexGroup>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(
  collectionsSelectors,
  collectionsActions
)(IomCollectionsView);

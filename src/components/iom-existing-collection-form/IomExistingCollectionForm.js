import React from "react";
import { connect } from "react-redux";

// Styles
import "./IomExistingCollectionForm.scss";

// Selectors
import collectionsSelectors from "../../store/selectors/collections";
import collectionsActions from "../../store/actions/collections";

// Elastic UI Components
import {
  EuiForm,
  EuiSuperSelect,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiButtonIcon,
} from "@elastic/eui";

class IomExistingCollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCollection: null,
      isSending: false,
    };
    this.setCollection = this.setCollection.bind(this);
    this.reduceCollectionsToOptions = this.reduceCollectionsToOptions.bind(
      this
    );
  }

  componentDidMount() {
    this.props.getCollections();
  }

  setCollection(selectedCollection) {
    this.setState({ selectedCollection });
  }

  reduceCollectionsToOptions(collections, collection) {
    const placeNotAlreadyInCollection = collection.places.every(
      (place) => place.code !== this.props.place.code
    );
    if (placeNotAlreadyInCollection) {
      collections.push({
        value: collection,
        icon: collection.icon,
        inputDisplay: <EuiText> {collection.name} </EuiText>,
      });
    }
    return collections;
  }

  render() {
    return (
      <EuiForm
        className="iom-collection-form__form"
        component="form"
        onSubmit={this.handleNewCollection}
      >
        <EuiFlexGroup gutterSize="xs">
          <EuiFlexItem>
            <EuiSuperSelect
              placeholder="Collection"
              options={[...this.props.collections].reduce(
                this.reduceCollectionsToOptions,
                []
              )}
              valueOfSelected={this.state.selectedCollection}
              onChange={(value) => this.setCollection(value)}
              disabled={this.isSending}
              isLoading={this.props.isLoading}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              isDisabled={this.props.isLoading}
              iconType="save"
              iconSize="m"
              size="m"
              onClick={() =>
                this.props.addPlaceToCollection({
                  collection: this.state.selectedCollection,
                  place: this.props.place,
                })
              }
              aria-label="save to existing collection"
            ></EuiButtonIcon>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
    );
  }
}

export default connect(
  collectionsSelectors,
  collectionsActions
)(IomExistingCollectionForm);

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
      selectedCollection: "",
      isSending: false,
    };
    this.setCollection = this.setCollection.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.mapCollectionsToOptions = this.mapCollectionsToOptions.bind(this);
  }

  componentDidMount() {
    this.props.getCollections();
  }

  setCollection(selectedCollection) {
    this.setState({ selectedCollection });
  }

  handleSave() {
    this.props.addPlaceToCollection({
      collection: this.state.selectedCollection,
      place: this.props.place,
    });
    this.props.onSave();
  }

  mapCollectionsToOptions(collections) {
    return collections.map((collection) => ({
      value: collection,
      icon: collection.icon,
      inputDisplay: <EuiText> {collection.name} </EuiText>,
    }));
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
              options={this.mapCollectionsToOptions(
                this.props.availableCollections
              )}
              valueOfSelected={
                this.state.selectedCollection ||
                this.props.availableCollections[0]
              }
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
              onClick={this.handleSave}
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

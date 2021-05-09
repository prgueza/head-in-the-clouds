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
    this.handleNewCollection = this.handleNewCollection.bind(this);
    this.setCollection = this.setCollection.bind(this);
    this.mapCollectionToOption = this.mapCollectionToOption.bind(this);
  }

  componentDidMount() {
    this.props.getCollections();
  }

  handleNewCollection() {}

  setCollection(selectedCollection) {
    this.setState({ selectedCollection });
  }

  mapCollectionToOption(collection) {
    return {
      value: "warning",
      icon: collection.icon,
      inputDisplay: <EuiText> {collection.name} </EuiText>,
    };
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
              options={this.props.collections.map(this.mapCollectionToOption)}
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

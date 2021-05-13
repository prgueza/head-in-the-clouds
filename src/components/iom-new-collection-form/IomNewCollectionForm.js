import { useState } from "react";
import { connect } from "react-redux";

// Styles
import "./IomNewCollectionForm.scss";

// Actions and Selectors
import collectionsSelectors from "../../store/selectors/collections";
import collectionsActions from "../../store/actions/collections";

// Elastic UI Components
import {
  EuiForm,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from "@elastic/eui";

const IomNewCollectionForm = ({ place, isLoading, onSave, postCollection }) => {
  const [collectionName, setCollectionName] = useState("");

  const handleNewCollection = (e) => {
    e.preventDefault();
    postCollection({
      collection: { name: collectionName, places: [place] },
    });
    onSave();
  };

  return (
    <EuiForm
      className="iom-collection-form__form"
      component="form"
      onSubmit={handleNewCollection}
    >
      <EuiFlexGroup gutterSize="xs">
        <EuiFlexItem>
          <EuiFieldText
            placeholder="Collection Name"
            name="collectionName"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            type="submit"
            iconType="save"
            iconSize="m"
            size="m"
            aria-label="save to new collection"
            isDisabled={isLoading}
          ></EuiButtonIcon>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );
};

export default connect(
  collectionsSelectors,
  collectionsActions
)(IomNewCollectionForm);

import { useState } from "react";

// Styles
import "./IomNewCollectionForm.scss";

// Elastic UI Components
import {
  EuiForm,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from "@elastic/eui";

const IomNewCollectionForm = () => {
  const [collectionName, setCollectionName] = useState("");
  const [isLoading] = useState(true);
  const handleNewCollection = () => {};

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

export default IomNewCollectionForm;

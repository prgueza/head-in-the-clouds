import React, { useState } from "react";
import { connect } from "react-redux";

// Actions
import collectionsActions from "../../store/actions/collections";
import collectionsSelectors from "../../store/selectors/collections";

// Elastic UI Components
import { EuiButtonIcon, EuiPopover, EuiContextMenu } from "@elastic/eui";

// Components
import IomDeleteConfirmation from "../iom-delete-confirmation/IomDeleteConfirmation";

const IomCollectionCardActions = ({
  collection,
  isLoading,
  deleteCollection,
}) => {
  const [isPopoverOpen, setPopover] = useState(false);

  const panels = [
    {
      id: 0,
      title: `This cannot be undone`,
      content: (
        <IomDeleteConfirmation
          isLoading={isLoading}
          onConfirm={() => deleteCollection({ collection })}
          text="Are you sure? The collection and all the locations stored within will be
        lost forever."
        />
      ),
    },
  ];

  return (
    <>
      <EuiPopover
        id="contextMenuExample"
        button={
          <EuiButtonIcon
            color="text"
            iconType="trash"
            aria-label="delete"
            onClick={() => setPopover(!isPopoverOpen)}
          />
        }
        isOpen={isPopoverOpen}
        closePopover={() => setPopover(false)}
        panelPaddingSize="none"
        anchorPosition="downLeft"
      >
        <EuiContextMenu initialPanelId={0} panels={panels} />
      </EuiPopover>
    </>
  );
};

export default connect(
  collectionsSelectors,
  collectionsActions
)(IomCollectionCardActions);

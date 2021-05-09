import React, { useState } from "react";

// Elastic UI Components
import { EuiButtonIcon, EuiPopover, EuiContextMenu } from "@elastic/eui";

// Components
import IomNewCollectionForm from "../iom-new-collection-form/IomNewCollectionForm";
import IomExistingCollectionForm from "../iom-existing-collection-form/IomExistingCollectionForm";

const IomLocationCardActions = ({ location, onRefresh, onSave, onDelete }) => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };
  const panels = [
    {
      id: 0,
      title: `Save ${location.name} to your Collections`,
      items: [
        {
          name: "Save to new Collection",
          icon: "listAdd",
          panel: 1,
        },
        {
          name: "Save to existing Collection",
          icon: "list",
          panel: 2,
        },
      ],
    },
    {
      id: 1,
      initialFocusedItemIndex: 1,
      title: "Save to new Collection",
      content: <IomNewCollectionForm />,
    },
    {
      id: 2,
      title: "Save to existing Collection",
      content: <IomExistingCollectionForm />,
    },
  ];

  return (
    <>
      <EuiButtonIcon
        color="text"
        iconType="refresh"
        aria-label="refresh"
        onClick={onRefresh}
      />
      <EuiPopover
        id="contextMenuExample"
        button={
          <EuiButtonIcon
            color="text"
            iconType="save"
            aria-label="save"
            onClick={onButtonClick}
          />
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        anchorPosition="downLeft"
      >
        <EuiContextMenu initialPanelId={0} panels={panels} />
      </EuiPopover>
      <EuiButtonIcon
        color="text"
        iconType="trash"
        aria-label="delete"
        onClick={onDelete}
      />
    </>
  );
};

export default IomLocationCardActions;

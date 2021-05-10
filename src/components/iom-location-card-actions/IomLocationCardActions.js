import React, { useState } from "react";

// Providers
import { useAuthContext } from "../../providers/IomAuthProvider";

// Elastic UI Components
import { EuiButtonIcon, EuiPopover, EuiContextMenu } from "@elastic/eui";

// Components
import IomNewCollectionForm from "../iom-new-collection-form/IomNewCollectionForm";
import IomExistingCollectionForm from "../iom-existing-collection-form/IomExistingCollectionForm";

const IomLocationCardActions = ({ location, onRefresh }) => {
  const auth = useAuthContext();
  const [isPopoverOpen, setPopover] = useState(false);

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
      content: <IomNewCollectionForm location={location} />,
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
      {auth.isLoggedIn && (
        <EuiPopover
          id="contextMenuExample"
          button={
            <EuiButtonIcon
              color="text"
              iconType="save"
              aria-label="save"
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
      )}
      {auth.isLoggedIn && (
        <EuiButtonIcon color="text" iconType="trash" aria-label="delete" />
      )}
    </>
  );
};

export default IomLocationCardActions;

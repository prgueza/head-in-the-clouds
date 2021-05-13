import React, { useState } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";

// Providers
import { useAuthContext } from "../../providers/IomAuthProvider";

// Selectors and Actions
import collectionsSelectors from "../../store/selectors/collections";
import collectionsActions from "../../store/actions/collections";

// Elastic UI Components
import { EuiButtonIcon, EuiPopover, EuiContextMenu } from "@elastic/eui";

// Components
import IomNewCollectionForm from "../iom-new-collection-form/IomNewCollectionForm";
import IomExistingCollectionForm from "../iom-existing-collection-form/IomExistingCollectionForm";
import IomDeleteConfirmation from "../iom-delete-confirmation/IomDeleteConfirmation";

const IomPlaceCardActions = ({
  place,
  onRefresh,
  isLoading,
  collection,
  removePlaceFromCollection,
}) => {
  const auth = useAuthContext();
  const [isSavePopoverOpen, setSavePopover] = useState(false);
  const [isDeletePopoverOpen, setDeletePopover] = useState(false);
  const location = useLocation();

  const savePanel = [
    {
      id: 0,
      title: `Save ${place.name} to your Collections`,
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
      content: <IomNewCollectionForm place={place} />,
    },
    {
      id: 2,
      title: "Save to existing Collection",
      content: <IomExistingCollectionForm place={place} />,
    },
  ];

  const deletePanel = [
    {
      id: 0,
      title: `This cannot be undone`,
      content: (
        <IomDeleteConfirmation
          isLoading={isLoading}
          onConfirm={() => removePlaceFromCollection({ collection, place })}
          text="Are you sure? The collection and all the places stored within will be
        lost forever."
        />
      ),
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
      {auth.isLoggedIn && !location.pathname.includes("places") && (
        <EuiPopover
          id="contextMenuExample"
          button={
            <EuiButtonIcon
              color="text"
              iconType="save"
              aria-label="save"
              onClick={() => setSavePopover(!isSavePopoverOpen)}
            />
          }
          isOpen={isSavePopoverOpen}
          closePopover={() => setSavePopover(false)}
          panelPaddingSize="none"
          anchorPosition="downLeft"
        >
          <EuiContextMenu initialPanelId={0} panels={savePanel} />
        </EuiPopover>
      )}
      {auth.isLoggedIn && location.pathname.includes("places") && (
        <EuiPopover
          id="contextMenuExample"
          button={
            <EuiButtonIcon
              color="text"
              iconType="trash"
              aria-label="delete"
              onClick={() => setDeletePopover(!isDeletePopoverOpen)}
            />
          }
          isOpen={isDeletePopoverOpen}
          closePopover={() => setDeletePopover(false)}
          panelPaddingSize="none"
          anchorPosition="downLeft"
        >
          <EuiContextMenu initialPanelId={0} panels={deletePanel} />
        </EuiPopover>
      )}
    </>
  );
};

export default connect(
  collectionsSelectors,
  collectionsActions
)(IomPlaceCardActions);

import React, { useEffect } from "react";
import { connect } from "react-redux";

// Actions and Selectors
import collectionsActions from "../../store/actions/collections";
import collectionsSelectors from "../../store/selectors/collections";

// Elastic UI Components
import {
  EuiTitle,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  euiDragDropReorder,
} from "@elastic/eui";

// Components
import IomCollectionCard from "../../components/iom-collection-card/IomCollectionCard";

const IomCollectionsView = ({
  collections,
  getCollections,
  reorderCollections,
}) => {
  useEffect(() => {
    if (!collections.length) getCollections();
    // eslint-disable-next-line
  }, []);

  const onDragEnd = ({ source, destination }) => {
    if (source && destination && source.index !== destination.index) {
      const reorderedCollections = euiDragDropReorder(
        collections,
        source.index,
        destination.index
      );
      reorderCollections({
        collections: reorderedCollections.map((collection, idx) => ({
          ...collection,
          order: idx,
        })),
      });
    }
  };

  return (
    <section className="iom-section">
      <div className="iom-section__header">
        <EuiTitle size="l" className="iom-section__header-title">
          <h1>Collections</h1>
        </EuiTitle>
      </div>
      <div className="iom-section__content-wrapper">
        <EuiDragDropContext onDragEnd={onDragEnd}>
          <EuiDroppable
            className="iom-section__content iom-section__content--column"
            spacing="l"
            direction="vertical"
            droppableId="COLLECTIONS_DROPABLE_AREA"
          >
            {collections.map((collection, idx) => (
              <EuiDraggable
                className="iom-section__dragable-item"
                key={collection._id}
                index={idx}
                draggableId={collection._id}
              >
                {() => (
                  <IomCollectionCard
                    collection={collection}
                  ></IomCollectionCard>
                )}
              </EuiDraggable>
            ))}
          </EuiDroppable>
        </EuiDragDropContext>
      </div>
    </section>
  );
};

export default connect(
  collectionsSelectors,
  collectionsActions
)(IomCollectionsView);

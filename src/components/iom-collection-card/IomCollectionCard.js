import React from "react";
import { useHistory } from "react-router-dom";

// Utilities
import { asDate } from "../../utils/formatters";

// Styles
import "./IomCollectionCard.scss";

// Elastic UI Components
import { EuiCard, EuiIcon, EuiText } from "@elastic/eui";

const IomCollectionCard = ({ collection }) => {
  const history = useHistory();
  return (
    <EuiCard
      textAlign="center"
      title={collection.name}
      icon={<EuiIcon size="xxl" type={collection.icon} />}
      onClick={() => history.push(`/collections/${collection._id}/locations`)}
    >
      <EuiText className="iom-collection-card__date" size="xs">
        {asDate(collection.createdAt)}
      </EuiText>
    </EuiCard>
  );
};

export default IomCollectionCard;

import React from "react";
import { Link } from "react-router-dom";

// Services
import { getLocations } from "../../services/locations";

// Context
import { authContext } from "../../providers/IomAuthProvider";

// Utilities
import { asDate } from "../../utils/formatters";

// Styles
import "./IomCollectionCard.scss";

// Elastic UI Components
import {
  EuiCard,
  EuiIcon,
  EuiText,
  EuiTitle,
  EuiLoadingContent,
  EuiButtonEmpty,
} from "@elastic/eui";
import IomCollectionCardActions from "../iom-collection-card-actions/IomCollectionCardActions";

class IomCollectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      locations: [],
    };
    this.getLocationsList = this.getLocationsList.bind(this);
  }

  componentDidMount() {
    this.getLocationsList();
  }

  async getLocationsList() {
    try {
      this.setState({ isLoading: true });
      const { locations } = await getLocations(
        {
          collectionId: this.props.collection._id,
        },
        { token: this.context.token }
      );
      this.setState({ locations });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => this.setState({ isLoading: false }), 500);
    }
  }

  render() {
    return (
      <EuiCard
        className="iom-collection-card"
        textAlign="center"
        title={
          <EuiTitle className="iom-location-card__title" size="l">
            <h1>{this.props.collection.name}</h1>
          </EuiTitle>
        }
        footer={
          <Link to={`/collections/${this.props.collection._id}/locations`}>
            <EuiButtonEmpty color="text" iconType="arrowRight" iconSide="right">
              Go to locations
            </EuiButtonEmpty>
          </Link>
        }
        icon={<EuiIcon size="xxl" type={this.props.collection.icon} />}
      >
        <div className="iom-collection-card__actions">
          <IomCollectionCardActions collection={this.props.collection} />
        </div>
        {this.state.isLoading ? (
          <EuiLoadingContent lines={2} />
        ) : (
          <>
            <EuiText className="iom-collection-card__description" size="m">
              Your collection {this.props.collection.name} was saved on{" "}
              <span className="highlight">
                {asDate(this.props.collection.createdAt)}
              </span>{" "}
              and consists of{" "}
              <span className="highlight">{this.state.locations.length}</span>{" "}
              locations.
            </EuiText>
          </>
        )}
      </EuiCard>
    );
  }
}

IomCollectionCard.contextType = authContext;

export default IomCollectionCard;

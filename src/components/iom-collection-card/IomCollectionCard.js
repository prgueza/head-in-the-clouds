import React from "react";
import { Link } from "react-router-dom";

// Services
import { getPlaces } from "../../services/collections";

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
      places: [],
    };
    this.getPlaces = this.getPlaces.bind(this);
  }

  componentDidMount() {
    this.getPlaces();
  }

  async getPlaces() {
    try {
      this.setState({ isLoading: true });
      const { places } = await getPlaces(
        {
          collection: this.props.collection,
        },
        { token: this.context.token }
      );
      this.setState({ places });
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
          <EuiTitle className="iom-place-card__title" size="l">
            <h1>{this.props.collection.name}</h1>
          </EuiTitle>
        }
        footer={
          !!this.state.places.length ? (
            <Link
              to={{
                pathname: `/collections/${this.props.collection._id}/places`,
                collection: this.props.collection,
              }}
            >
              <EuiButtonEmpty
                color="text"
                iconType="arrowRight"
                iconSide="right"
              >
                Go to places
              </EuiButtonEmpty>
            </Link>
          ) : (
            <EuiButtonEmpty
              isDisabled={true}
              color="text"
              iconType="arrowRight"
              iconSide="right"
            >
              Go to places
            </EuiButtonEmpty>
          )
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
              <span className="highlight">{this.state.places.length}</span>{" "}
              place{`${this.state.places.length !== 1 ? "s" : ""}`}.
            </EuiText>
          </>
        )}
      </EuiCard>
    );
  }
}

IomCollectionCard.contextType = authContext;

export default IomCollectionCard;

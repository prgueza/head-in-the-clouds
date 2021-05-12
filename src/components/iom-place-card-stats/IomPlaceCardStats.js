import React from "react";

// Styles
import "./IomPlaceCardStats.scss";

// Utilities
import { withUnits } from "../../utils/formatters";

// Elastic UI Components
import {
  EuiIcon,
  EuiStat,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from "@elastic/eui";

const IomCardStats = ({
  isLoading,
  temperature,
  rainChance,
  rainPredictions,
}) => (
  <EuiFlexGroup className="iom-place-card__stats" gutterSize="l">
    <EuiFlexItem>
      <EuiStat
        textAlign="center"
        title={withUnits(
          temperature?.current?.value,
          temperature?.current?.units
        )}
        description="Temperature"
        isLoading={isLoading}
      >
        <EuiText className="iom-place-card__stat-subtitle" size="xs">
          {!isLoading && (
            <>
              <div>
                <EuiIcon type="sortUp" size="s" />
                <span>
                  {withUnits(temperature?.max?.value, temperature?.max?.units)}
                </span>
              </div>
              <div>
                <EuiIcon type="sortDown" size="s" />
                <span>
                  {withUnits(temperature?.min?.value, temperature?.min?.units)}
                </span>
              </div>
            </>
          )}
        </EuiText>
      </EuiStat>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiStat
        textAlign="center"
        title={withUnits(rainChance?.value, rainChance?.units)}
        description="Rain chance"
        isLoading={isLoading}
      >
        <EuiText className="iom-place-card__stat-subtitle" size="xs">
          {!isLoading && (
            <div>
              <EuiIcon type="tear" size="s" />
              <span>
                {withUnits(
                  !!rainPredictions?.values?.length &&
                    Math.max(...rainPredictions.values),
                  `${rainPredictions?.units} (max)`
                )}
              </span>
            </div>
          )}
        </EuiText>
      </EuiStat>
    </EuiFlexItem>
  </EuiFlexGroup>
);

export default IomCardStats;

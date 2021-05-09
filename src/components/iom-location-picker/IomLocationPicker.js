import React from "react";
import { connect } from "react-redux";

// Styles
import "./IomLocationPicker.css";

// Actions and Selectors
import locationsActions from "../../store/actions/locations";
import locationsSelectors from "../../store/selectors/locations";

// Elastic UI Components
import { EuiComboBox, EuiHighlight, EuiBadge } from "@elastic/eui";

const IomLocationPicker = ({
  getLocations,
  selectLocations,
  queryLocations,
  isLoading,
  filteredLocations,
  selectedLocations,
}) => {
  const renderOption = (option, query) => {
    const { name, county } = option;
    return (
      <span className="location-picker__option">
        <EuiHighlight search={query}>{name}</EuiHighlight>
        <EuiBadge>{county}</EuiBadge>
      </span>
    );
  };

  return (
    <EuiComboBox
      // isLoading={isLoading}
      className="location-picker"
      sortMatchesBy="startsWith"
      placeholder="Search for any town!"
      options={filteredLocations}
      selectedOptions={selectedLocations}
      onFocus={() => false || getLocations()}
      onSearchChange={(query) => queryLocations({ query })}
      onChange={(selectedLocations) => selectLocations({ selectedLocations })}
      renderOption={renderOption}
      isClearable={true}
    />
  );
};

export default connect(locationsSelectors, locationsActions)(IomLocationPicker);

import React from "react";
import { connect } from "react-redux";

// Styles
import "./IomTownPicker.scss";

// Actions and Selectors
import townsActions from "../../store/actions/towns";
import townsSelectors from "../../store/selectors/towns";

// Elastic UI Components
import { EuiComboBox, EuiHighlight, EuiBadge } from "@elastic/eui";

const IomTownPicker = ({
  getTowns,
  selectTowns,
  queryTowns,
  // isLoading,
  filteredTowns,
  selectedTowns,
}) => {
  const renderOption = (option, query) => {
    const { name, county } = option;
    return (
      <span className="iom-town-picker__option">
        <EuiHighlight search={query}>{name}</EuiHighlight>
        <EuiBadge>{county}</EuiBadge>
      </span>
    );
  };

  return (
    <EuiComboBox
      // isLoading={isLoading}
      className="iom-town-picker"
      sortMatchesBy="startsWith"
      placeholder="Search for any town!"
      options={filteredTowns}
      selectedOptions={selectedTowns}
      onFocus={() => false || getTowns()}
      onSearchChange={(query) => queryTowns({ query })}
      onChange={(selectedTowns) => selectTowns({ selectedTowns })}
      renderOption={renderOption}
      isClearable={true}
    />
  );
};

export default connect(townsSelectors, townsActions)(IomTownPicker);

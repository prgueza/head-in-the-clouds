import React from "react";
import { connect } from "react-redux";

// Styles
import "./IomTownPicker.scss";

// Actions and Selectors
import townsActions from "../../store/actions/towns";
import townsSelectors from "../../store/selectors/towns";

// Utilities
import debouncer from "../../utils/debounce";

// Elastic UI Components
import { EuiComboBox, EuiHighlight, EuiBadge } from "@elastic/eui";

const IomTownPicker = ({
  towns,
  getTowns,
  selectTowns,
  queryTowns,
  isLoading,
  filteredTowns,
  selectedTowns,
}) => {
  const handleFocus = () => {
    if (!towns.length && !isLoading) {
      getTowns();
    }
  };

  /*
    For some reason the EuiComboBox triggers the onFocus
    callback several times, so debouncing the handler is
    necessary in order to prevent triggering the accion
    multiple times
  */
  const debouncedFocusHandler = debouncer(handleFocus);

  const renderOption = (option, query) => {
    const { label, county } = option;
    return (
      <span className="iom-town-picker__option">
        <EuiHighlight search={query}>{label}</EuiHighlight>
        <EuiBadge>{county}</EuiBadge>
      </span>
    );
  };

  return (
    <EuiComboBox
      isLoading={isLoading}
      className="iom-town-picker"
      sortMatchesBy="startsWith"
      placeholder="Search for any town!"
      options={filteredTowns}
      selectedOptions={selectedTowns}
      onFocus={debouncedFocusHandler}
      onSearchChange={(query) => queryTowns({ query })}
      onChange={(selectedTowns) => selectTowns({ selectedTowns })}
      renderOption={renderOption}
      isClearable={true}
    />
  );
};

export default connect(townsSelectors, townsActions)(IomTownPicker);

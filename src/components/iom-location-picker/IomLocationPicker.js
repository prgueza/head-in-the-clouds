import React from "react";
import { EuiComboBox } from "@elastic/eui";
import { useDispatch, useSelector } from "react-redux";

const IomLocationPicker = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const selectedLocations = useSelector(
    (state) => state.locations.selectedLocations
  );

  const getLocations = () => {
    if (!locations.length) {
      dispatch({ type: "LOCATION_FETCH_REQUESTED" });
    }
  };

  const setLocation = (selectedLocations) => {
    dispatch({ type: "LOCATION_SELECTED", payload: selectedLocations });
  };

  return (
    <EuiComboBox
      placeholder="Select or create options"
      options={locations.map(({ name }) => ({ label: name }))}
      selectedOptions={selectedLocations}
      onFocus={getLocations}
      onChange={setLocation}
      isClearable={true}
      onSearchChange={getLocations}
    />
  );
};

export default IomLocationPicker;

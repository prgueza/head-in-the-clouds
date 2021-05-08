import { createSelector } from "reselect";

const locations = (state) => state.weather.locations;

export const getLocationsAsOptions = createSelector([locations], (locations) =>
  locations.map(({ name }) => ({ label: name }))
);

import { APPS_FAILURE, APPS_SUCCESS, APPS_REQUEST, REVERSE_SORT, TOGGLE_HEADER_DROPDOWN } from '../actions/types.js';

import { SortByDirection, sortable } from '@patternfly/react-table';

const columns = [
  { title: 'App ID', transforms: [ sortable ] },
  { title: 'Deployed Versions', transforms: [ sortable ] },
  { title: 'Current Installs', transforms: [ sortable ] },
  { title: 'Launches', transforms: [ sortable ] }
];

const apps = [];

const sortBy = { direction: SortByDirection.asc, index: 0 };

const initialState = {
  data: {
    apps: apps,
    columns: columns,
    currentUser: 'currentUser'
  },
  ui: {
    isAppsRequestFailed: false,
    isUserDropdownOpen: false,
    sortBy: sortBy
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REVERSE_SORT:
      const reversedOrder =
        state.ui.sortBy.direction === SortByDirection.asc ? SortByDirection.desc : SortByDirection.asc;
      const index = action.payload.index;
      const sortedRows = state.data.apps.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
      const sortedApps = reversedOrder === SortByDirection.asc ? sortedRows : sortedRows.reverse();
      return {
        ...state,
        ui: {
          sortBy: {
            direction: reversedOrder,
            index: index
          }
        },
        data: { apps: sortedApps }
      };
    case APPS_REQUEST:
      return {
        ...state
      };
    case APPS_SUCCESS:
      var fetchedApps = [];
      action.result.forEach((app) => {
        var temp = [];
        temp[0] = app.appId;
        temp[1] = app.numOfDeployedVersions;
        temp[2] = app.numOfCurrentInstalls;
        temp[3] = app.numOfAppLaunches;
        fetchedApps.push(temp);
      });
      return {
        ...state,
        apps: fetchedApps,
        isAppsRequestFailed: false
      };
    case APPS_FAILURE:
      return {
        ...state,
        isAppsRequestFailed: true
      };
    case TOGGLE_HEADER_DROPDOWN:
      const isUserDropdownOpen = state.isUserDropdownOpen;
      return {
        ...state,
        isUserDropdownOpen: !isUserDropdownOpen
      };
    default:
      return state;
  }
};

import React, { Component } from "react";
import AppGridHeader from "./AppGridHeader";
import AppGridRows from "./AppGridRows";
import { Table } from '@patternfly/react-table';
import SimpleTable from "./SimpleTable";

class AppGrid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="appGrid">
        <SimpleTable />               
      </div>
    );
  }
}

export default AppGrid;

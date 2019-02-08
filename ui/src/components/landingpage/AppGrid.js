import React, { Component } from "react";
import AppGridHeader from "./AppGridHeader";
import AppGridRows from "./AppGridRows";


class AppGrid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="appGrid">
        <table className="pf-c-table pf-m-grid-md" role="grid" aria-label="This is a simple table example">
          <AppGridHeader />
          <AppGridRows /> 
        </table>               
      </div>
    );
  }
}

export default AppGrid;

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
        <AppGridHeader />
        <AppGridRows />        
      </div>
    );
  }
}

export default AppGrid;

import React, { Component } from "react";
import AppGridRow from './AppGridRow'

class AppGridRows extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="appGridRows">
        <AppGridRow />
        <AppGridRow />        
      </div>
    );
  }
}

export default AppGridRows;

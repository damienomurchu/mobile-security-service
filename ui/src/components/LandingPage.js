import React, { Component } from "react";
import Header from './landingpage/Header'
import AppGrid from "./landingpage/AppGrid";
import { Button } from 'patternfly-react'; 

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="landingPage">
        <Header />
        <AppGrid />
        <Button>I'm a patternfly button</Button>        
      </div>
    );
  }
}

export default LandingPage;

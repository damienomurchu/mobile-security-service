import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import '../node_modules/patternfly-react/dist/css/patternfly-react.css'
import SampleTable from './components/landingpage/SampleTable'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SampleTable />
      </div>
    );
  }
}

export default App;

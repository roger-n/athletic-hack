import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Customers from './components/customers';
import VersionTable from './components/versionTable';

class App extends Component {

    state = {
        canvasID: "newCanvas",
        coordinates: []
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
<<<<<<< HEAD
          <VersionTable/>
          <h1 className="App-title">React Express Starter</h1>
=======
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Athletic Hack</h1>
>>>>>>> 874772f57655b2fb1adf8ac9a5e4d620751baaf3
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;

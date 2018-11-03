import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers';
import VersionTable from './components/versionTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <VersionTable/>
          <h1 className="App-title">React Express Starter</h1>
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;

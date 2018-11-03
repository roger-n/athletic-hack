import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import VersionTable from './components/versionTable';

class App extends Component {

    state = {
        canvasID: "newCanvas",
        coordinates: [],
        versions: [
            { id: 0, name: 'John Doe', coordList: [ { x: 1, y: 3 }, { x: 2, y: 4 } ] },
            { id: 1, name: 'Hailee Peterson', coordList: [ { x: 3, y: 8 }, { x: 1, y: 9 } ] },
            { id: 2, name: 'Training Dummy', coordList: [ { x: 1, y: 6 }, { x: 6, y: 4 } ] },
        ]
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Athletic Hack</h1>
        </header>
        <div className="App-div">
            <VersionTable onVersionClick={this.handleVersionClick}
                          versions={this.state.versions}/>
        </div>
      </div>
    );
  }

    handleVersionClick = versionID => {
        const versions = this.state.versions.filter(v => v.id !== versionID);
        this.setState({ versions })
        //Set current versionID in top level state to that of the one clicked, UI/canvas should update accordingly
    }

    handleSaveClick = (name, tempCoords) => {
        //Push to database a new JSON with name and tempCoords
        //Set top level state to database get-all request
    }
}

export default App;

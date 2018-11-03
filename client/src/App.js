import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.png';
import './App.css';
import VersionTable from './components/versionTable';
import UI from './components/UI';

class App extends Component {

    state = {
        canvasID: "newCanvas",
        coordinates: [],
        versions: [
            { id: 0,
                name: 'John Doe',
                coordList: [ { x: 1, y: 3 }, { x: 2, y: 4 } ],
                avgPoint: {x: 2, y: 3},
                point1: {x: 6, y: 4},
                point2: {x: 8, y: 4}
                },
            { id: 1,
                name: 'Hailee Peterson',
                coordList: [ { x: 3, y: 8 }, { x: 1, y: 9 } ],
                avgPoint: {x: 2, y: 3},
                point1: {x: 6, y: 4},
                point2: {x: 8, y: 4} },
            { id: 2,
                name: 'Training Dummy',
                coordList: [ { x: 1, y: 6 }, { x: 6, y: 4 } ],
                avgPoint: {x: 2, y: 3},
                point1: {x: 6, y: 4},
                point2: {x: 8, y: 4} },
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
            <div className="Version-table">
                <VersionTable onVersionClick={this.handleVersionClick}
                              versions={this.state.versions}/>
            </div>
            <div className="UI">
                <UI onSaveClick={this.handleSaveClick}/>
            </div>
        </div>
      </div>
    );
  }

    handleVersionClick = versionID => {
        const versions = this.state.versions.filter(v => v.id !== versionID);
        this.setState({ versions })
        //Set current versionID in top level state to that of the one clicked, UI/canvas should update accordingly
    };

    handleSaveClick = (name, tempCoords) => {
        console.log('Help');
        axios.post('localhost:5000/save', name, tempCoords)
            .then(()=>{console.log("Posted to server")
        });
        //Push to database a new JSON with name and tempCoords
        //Set top level state to database get-all request
    };
}

export default App;

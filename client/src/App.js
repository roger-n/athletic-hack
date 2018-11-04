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

        versions: [],

        currentVersion: null
    };

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
                <UI onSaveClick={this.handleSaveClick}
                    onNewClick = {this.handleNewClick}
                    currentVersion = {this.state.currentVersion}/>
            </div>
        </div>
      </div>
    );
  }

    handleVersionClick = versionID => {
      console.log("Handling Version Click");
      const versions = this.state.versions.filter(v => v._id !== versionID);
      this.setState({ versions })
        //Set current versionID in top level state to that of the one clicked, UI/canvas should update accordingly
    };

    handleSaveClick = (name, tempCoords) => {
        console.log('Save button clicked');
        axios.post('http://localhost:5000/save', name, tempCoords)
            .then(()=>{
                console.log("Posted to server");
                let newState = {...this.state};
                newState.currentVersion = null;
                this.setState(newState);
        });

        //Push to database a new JSON with name and tempCoords
        //Set top level state to database get-all request

        axios.get('http://localhost:5000/players')
            .then(results => {
                this.setState( {versions: results.data} )
                }
            )
    };

    handleNewClick = () => {
        console.log('New Button Clicked');
        let newState = {...this.state};
        newState.currentVersion = null;
        this.setState(newState);
        console.log('currentState set to null object');
    }
}

export default App;

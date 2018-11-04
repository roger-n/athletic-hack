import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.png';
import './App.css';
import VersionTable from './components/versionTable';
import UI from './components/UI';

class App extends Component {

  state = {
      canvasID: "",
      versions: [],
      currentVersion: {}
  };

  constructor () {
        super()
        this.myUI = React.createRef();
  }

  componentDidMount() {

      console.log('Component Mounted');

      let canvasID = "newCanvas";
      this.setState({canvasID});

      axios.get('http://localhost:5000/players')
          .then(results => {
                  this.setState( {versions: results.data} )
              }
          );

      let currentVersion = {_id: null, name: null, coordList: [], avgPoint: null, point1: null, point2: null, radius: null};
      this.setState({currentVersion})
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
                              onDeleteClick={this.handleDeleteClick}
                              versions={this.state.versions}/>
            </div>
            <div className="UI">
                <UI ref="myUI"
                    onSaveClick={this.handleSaveClick}
                    onNewClick = {this.handleNewClick}
                    currentVersion = {this.state.currentVersion}/>
            </div>
        </div>
      </div>
    );
  }

    handleVersionClick = versionID => {
        console.log("Handling Version Click");
        console.log(versionID)
        axios.get('http://localhost:5000/players/' + versionID)
            .then(results => {
                this.setState( {currentVersion: results.data} )
                console.log(this.state.currentVersion)
                this.refs.myUI.reDrawWithData();

            });
        //Set current versionID in top level state to that of the one clicked, UI/canvas should update accordingly
    };

    handleDeleteClick = (versionID) => {
        console.log('Handling Delete Click');
        console.log(versionID);
        axios.post('http://localhost:5000/delete/' + versionID)
            .then(()=> {
                console.log("Deleted from server");
                axios.get('http://localhost:5000/players')
                    .then(results => {
                        this.setState( {versions: results.data} )
                    }).catch(console.log)}).catch(console.log)
    };

    handleSaveClick = (name, tempCoords) => {
        console.log('Save button clicked');
        console.log(name)
        //console.log
      
        axios.post('http://localhost:5000/save', {
            name: name,
            coordsList:tempCoords})
            .then(()=>{
                console.log("Posted to server");
                let newState = {...this.state};
                newState.currentVersion = {_id: null, name: null, coordList: [], avgPoint: null, point1: null, point2: null, radius: null};
                this.setState(newState);
                this.refs.myUI.reDraw();
                axios.get('http://localhost:5000/players')
                    .then(results => {
                            this.setState( {versions: results.data} )
                    })})

        //Push to database a new JSON with name and tempCoords
        //Set top level state to database get-all request

    };

    handleNewClick = () => {
        console.log('New Button Clicked');
        let currentVersion = {...this.state.currentVersion};
        currentVersion.coordList.length = 0;
        this.setState({currentVersion});
        console.log('currentVersion objects set to null');
        this.refs.myUI.reDraw();

    }
}

export default App;

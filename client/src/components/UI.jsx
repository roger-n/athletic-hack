import React, { Component } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './UI.css';
import Canvas from './Canvas'


class UI extends Component {

    state = {
        localName: ''
    }

    constructor () {
        super();
        this.myCanvas = React.createRef();
    }


    render () {

        return (
            <div className="UI">
                <div className="Top-part">
                    {/*Save Button*/}
                    <button
                        className="btn btn-primary m-2 btn-lg"
                        onClick={() => (this.props.onSaveClick(this.state.localName, this.props.currentVersion.coordList))}>
                        Submit
                    </button>

                    {/*When field state changes, change name*/}
                    <div className="input-group m-2 input-group-lg">
                        <input
                            value={this.state.localName}
                            type="text"
                            className="form-control"
                            placeholder="New Player Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={this.updateInputValue}/>
                    </div>
                    {/*Testing button click to to function*/}
                    <button
                        className="btn btn-success m-2 btn-lg"
                        onClick={() => this.props.onNewClick()}>
                        Clear
                    </button>
                </div>
                <div className="CanvasPart">
                    <Canvas ref="myCanvas"
                            coordList={this.props.currentVersion.coordList}
                            currentVersion = {this.props.currentVersion}/>
                </div>
            </div>
        );
    }

    updateInputValue = (evt) => {
        this.setState({
            localName: evt.target.value
        });
    }


    reDraw = () => {
        console.log('trying to redraw from UI')
        this.refs.myCanvas.reDraw();
    }

    reDrawWithData = () => {
        console.log('trying to redraw with data')
        this.refs.myCanvas.reDrawWithData();
    }
}

export default UI;
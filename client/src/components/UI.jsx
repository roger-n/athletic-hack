import React, { Component } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './UI.css';
import Canvas from './Canvas'


class UI extends Component {


    constructor () {
        super()
            this.myCanvas = React.createRef();
    }

    render () {
        return (
            <div className="UI">
                <div className="Top-part">
                    {/*Save Button*/}
                    <button
                        className="btn btn-primary m-2"
                        onClick={() => (this.props.onSaveClick(this.props.currentVersion.name, this.props.currentVersion.coordList))}>
                        Submit
                    </button>

                    {/*When field state changes, change name*/}
                    <div className="input-group m-2">
                        <input
                            value={this.props.currentVersion.name}
                            type="text"
                            className="form-control"
                            placeholder="New Player Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"/>
                    </div>
                    {/*Testing button click to to function*/}
                    <button
                        className="btn btn-success m-2"
                        onClick={() => this.props.onNewClick()}>
                        New Data Set
                    </button>
                </div>
                <div className="CanvasPart">
                    <Canvas ref="myCanvas" coordList={this.props.currentVersion.coordList}/>
                </div>
            </div>
        );
    }

    reDraw = () => {
        console.log('trying to redraw from UI')
        this.refs.myCanvas.reDraw();
    }
}

export default UI;
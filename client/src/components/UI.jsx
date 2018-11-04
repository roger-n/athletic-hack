import React, { Component } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './UI.css';
import Canvas from './Canvas'


class UI extends Component {

    state = {
        name: '',
        tempArray: [
            {x: 0.5, y: 0.8},
            {x: 0.6, y: 0.3},
            {x: 0.4, y: 0.6},
            {x: 0.5, y: 0.2},
            {x: 0.2, y: 0.3},
            {x: 0.7, y: 0.4},
            {x: 0.5, y: 0.2},
            {x: 0.3, y: 0.7},
        ]
    }

    render () {
        return (
            <div className="UI">
                <div className="Top-part">
                    {/*Save Button*/}
                    <button
                        className="btn btn-primary m-2"
                        onClick={() => (this.props.onSaveClick(this.state.name, this.state.tempArray))}>
                        Submit
                    </button>

                    {/*When field state changes, change name*/}
                    <div className="input-group m-2">
                        <input
                            value={this.state.name}
                            onChange={ this.handleChange }
                            type="text"
                            className="form-control"
                            placeholder="New Player Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"/>
                    </div>
                    {/*Testing button click to to function*/}
                    <input
                        type="button"
                        value="Alert the text input"
                        onClick={this.handleClick}
                    />
                </div>
                <div className="CanvasPart">
                    <Canvas tempArray={this.state.tempArray}/>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        let newState = {...this.state};
        newState.name = e.target.value;
        this.setState(newState);
        console.log(this.state.name);
    }

    handleClick = () => {
        console.log(this.state.name);
    }


}

export default UI;
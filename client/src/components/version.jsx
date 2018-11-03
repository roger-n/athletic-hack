import React, { Component } from 'react';

class Version extends Component {
    state = {
        id: 'Random Name',
        x: [1,3],
        y: [2,4],
    };

    render() {
        return (
            <div>
                <span className="badge badge-primary m-2"> {this.state.id} </span>
            </div>
        )
    }
}
import React, { Component } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Version extends Component {

    render() {
        const { _id, name } = this.props.version;
        return (
            <div>
                <button className="btn btn-secondary btn-lg m-2"
                        onClick={() => this.props.onVersionClick(_id)}> {name} </button>
            </div>
        )
    }
}

export default Version;
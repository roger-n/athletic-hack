import React, { Component } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./version.css"


class Version extends Component {

    render() {
        const { _id, name } = this.props.version;
        return (
            <div>
                <button className="btn btn-secondary btn-lg m-2 Constant-width"
                        onClick={() => this.props.onVersionClick(_id)}>{name}</button>
                <button className="btn btn-danger btn-lg"
                        onClick={() => this.props.onDeleteClick(_id)}>Delete</button>
            </div>
        )
    }
}

export default Version;
import React, { Component } from 'react';
import Version from './version';

class VersionTable extends Component {
    state = {
        versions: [
            { id: 0, name: 'John Doe', x: [1, 3], y: [2, 4] },
            { id: 1, name: 'Hailee Peterson', x: [8, 1], y: [2, 3] },
            { id: 2, name: 'Training Dummy', x: [3,6], y: [4,9] },
        ]
    };

    render() {
        return (
            <div>
                {this.state.versions.map(version => (
                    <Version key={version.id} onNameClick={this.handleNameClick} version={version}/>
                ))}
            </div>
        );
    }

    handleNameClick = versionID => {
        const versions = this.state.versions.filter(v => v.id !== versionID);
        this.setState({ versions })
    }
}

export default VersionTable;
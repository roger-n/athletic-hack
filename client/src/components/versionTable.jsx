import React, { Component } from 'react';
import Version from 'version';

class VersionTable extends Component {
    state = {
        versions: [
            { id: 1, x: [1,3], y: [2,4] }
        ]
    };

    render() {
        return (
            <div>
                {this.state.versions.map(version => (
                    <Version key={version.id} value={version.id}>
                        <h4>Player #{version.id}</h4>
                    </Version>
                ))}
            </div>
        );
    }
}

export default VersionTable;
import React, { Component } from 'react';
import Version from './version';

class VersionTable extends Component {

    render() {
        const { versions } = this.props;
        return (
            <div>
                {versions.map(version => (
                    <Version key={version.id}
                             onVersionClick={_id => this.props.onVersionClick(_id)}
                             version={ version }/>
                ))}
            </div>
        );
    }
}

export default VersionTable;
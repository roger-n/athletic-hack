import React, { Component } from 'react';
import Version from './version';

class VersionTable extends Component {

    render() {
        console.log('Rendering Version Table');
        console.log(this.props.versions);
        let { versions } = this.props;
        versions = versions.reverse();
        return (
            <div>
                {versions.map(version => (
                    <Version key={version.id}
                             onVersionClick={_id => this.props.onVersionClick(_id)}
                             onDeleteClick={_id => this.props.onDeleteClick(_id)}
                             version={ version }/>
                ))}
            </div>
        );
    }
}

export default VersionTable;
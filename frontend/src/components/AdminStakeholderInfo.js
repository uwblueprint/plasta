import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AdminStakeholderInfo extends Component {
  render() {
    return (
      <div>
        {this.props.stakeholders.map(stakeholder => (
          <div key={stakeholder.name.replace(' ', '-')}>
            <h1> {stakeholder.name} </h1>
            {stakeholder.projects.map(project => <p key={project.replace(' ', '-')}>{project}</p>)}
          </div>
        ))}
      </div>
    );
  }
}

AdminStakeholderInfo.propTypes = {
  stakeholders: PropTypes.array,
};

export default AdminStakeholderInfo;

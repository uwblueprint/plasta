import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AdminStakeholderInfo extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.stakeholders.map(stakeholder => (
          <div key={stakeholder.id}>
            <h1> {stakeholder.name} </h1>
            {stakeholder.projects.map(project => <p key={project.id}>{project.name}</p>)}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

AdminStakeholderInfo.propTypes = {
  stakeholders: PropTypes.array,
};

export default AdminStakeholderInfo;

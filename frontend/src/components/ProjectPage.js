import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactionHistory from './TransactionHistory';
import { fakeData } from './fakeData';
import './ProjectPage.css';

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Project Name',
    };
  }

  render() {
    return (
      <div className="page-wrapper" id="proj-page-wrapper">
        <h1>{this.state.name}</h1>
        <TransactionHistory data={fakeData} />
      </div>
    );
  }
}

ProjectPage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ProjectPage;

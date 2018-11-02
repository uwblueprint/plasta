import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactionHistory from './TransactionHistory';
import './ProjectPage.css';

let data = [];

class AdminStakeholderInfo extends Component {
  render() {
    return (
      <div className="page-wrapper" id="proj-page-wrapper">
        <TransactionHistory data={data} />
      </div>
    );
  }
}

AdminStakeholderInfo.propTypes = {
  stakeholders: PropTypes.array,
};

export default AdminStakeholderInfo;

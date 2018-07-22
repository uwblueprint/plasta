import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminNewStakeholder extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <h1>New Stakeholder</h1>
        <Link to="/adminstakeholder">
          <button className="btn" type="button">
            Submit
          </button>
        </Link>
      </div>
    );
  }
}

export default AdminNewStakeholder;

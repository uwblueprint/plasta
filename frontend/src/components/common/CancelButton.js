import React, { Component } from 'react';
import './CancelButton.css';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class CancelButton extends Component {
  render() {
    return (
      <Link to="/ps/transaction-history">
        <button className="btn-dark CancelButton">
          <i className="fas fa-times" style={{ marginRight: '1em' }} />
          Cancel
        </button>
      </Link>
    );
  }
}

export default withRouter(CancelButton);

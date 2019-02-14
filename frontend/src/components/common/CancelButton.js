import React, { Component } from 'react';
import './CancelButton.css';
import { withRouter } from 'react-router-dom';

class CancelButton extends Component {
  render() {
    return (
      <button className="btn-dark CancelButton" onClick={this.props.history.goBack}>
        <i className="fas fa-times" style={{ marginRight: '1em' }} />
        Cancel
      </button>
    );
  }
}

export default withRouter(CancelButton);

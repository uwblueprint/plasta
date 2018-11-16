import React, { Component } from 'react';
import './CancelButton.css';
import { withRouter } from 'react-router-dom';

class CancelButton extends Component {
  render() {
    return (
      <div id="cancel-button-wrapper">
        <button className="cancel-button" onClick={this.props.history.goBack}>
          <i className="far fa-times-circle" />
        </button>
      </div>
    );
  }
}

export default withRouter(CancelButton);

import React, { Component } from 'react';
import './CancelButton.css';
import { withRouter } from 'react-router-dom';

class CancelButton extends Component {
  render() {
    return (
      <div>
        <button className="CancelButton" onClick={this.props.history.goBack}>
          <i className="far fa-times-circle" />
        </button>
      </div>
    );
  }
}

export default withRouter(CancelButton);

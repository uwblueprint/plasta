import React, { Component } from 'react';
import './CancelButton.css';

class CancelButton extends Component {
  render() {
    return (
      <div id="cancel-button-wrapper">
        <button className="cancel-button">
          <i className="far fa-times-circle" />
        </button>
      </div>
    );
  }
}

export default CancelButton;

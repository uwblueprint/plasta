import React, { Component } from 'react';
import './LandingPage.css';

class DWCCLandingPage extends Component {
  render() {
    return (
      <div className="page-wrapper vcentre-outer" id="landing-wrapper">
        <div className="vcentre">
          <button className="btn" type="button">
            Most Recent Project
          </button>
          <button className="btn" type="button">
            Projects
          </button>
          <button className="btn" type="button">
            Wastepickers
          </button>
        </div>
      </div>
    );
  }
}

export default DWCCLandingPage;

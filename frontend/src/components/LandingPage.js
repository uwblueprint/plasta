import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  render() {
    return (
      <div className="page-wrapper vcentre-outer" id="landing-wrapper">
        <div className="vcentre">
          <button
            className="btn"
            type="button"
            onClick={() => this.props.history.push('admindash')}
          >
            Projects
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => this.props.history.push('/admin/stakeholders')}
          >
            Stakeholders
          </button>
        </div>
      </div>
    );
  }
}

export default LandingPage;

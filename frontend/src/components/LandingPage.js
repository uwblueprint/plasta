import React, { Component, Fragment } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  state = {
    isAdmin: true,
  };

  loadAdminPage = (
    <Fragment>
      <button className="btn" type="button" onClick={() => this.props.history.push('admindash')}>
        Projects
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => this.props.history.push('/admin/stakeholders')}
      >
        Stakeholders
      </button>
    </Fragment>
  );

  loadDwccPage = (
    <Fragment>
      <button className="btn" type="button">
        Most Recent Project
      </button>
      <button className="btn" type="button">
        Projects
      </button>
      <button className="btn" type="button">
        Wastepickers
      </button>
    </Fragment>
  );

  render() {
    return (
      <div className="page-wrapper vcentre-outer" id="landing-wrapper">
        <div className="vcentre">{this.state.isAdmin ? this.loadAdminPage : this.loadDwccPage}</div>
      </div>
    );
  }
}

export default LandingPage;

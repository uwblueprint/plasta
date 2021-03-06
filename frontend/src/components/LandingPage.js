import React, { Component, Fragment } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  state = {
    isAdmin: true,
  };

  loadAdminPage = (
    <Fragment>
      <button type="button" onClick={() => this.props.history.push('/projects')}>
        Projects
      </button>
      <button type="button" onClick={() => this.props.history.push('/admin/stakeholders')}>
        Stakeholders
      </button>
    </Fragment>
  );

  loadPrimarySegregatorPage = (
    <Fragment>
      <button type="button">Most Recent Project</button>
      <button type="button">Projects</button>
      <button type="button">Wastepickers</button>
    </Fragment>
  );

  render() {
    return (
      <div className="page-wrapper vcentre-outer" id="landing-wrapper">
        <div className="vcentre">
          {this.state.isAdmin ? this.loadAdminPage : this.loadPrimarySegregatorPage}
        </div>
      </div>
    );
  }
}

export default LandingPage;

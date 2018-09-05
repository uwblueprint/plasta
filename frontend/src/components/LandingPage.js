import React, { Component, Fragment } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  state = {
    is_admin: true,
  };

  load_admin_page = (
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

  load_dwcc_page = (
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
        <div className="vcentre">
          {this.state.is_admin ? this.load_admin_page : this.load_dwcc_page}
        </div>
      </div>
    );
  }
}

export default LandingPage;

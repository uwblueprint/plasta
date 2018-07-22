import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = props => (
  <div className="page-wrapper vcentre-outer" id="landing-wrapper">
    <div className="vcentre">
      <Link to="/admindash">
        <button className="btn" type="button">
          Projects
        </button>
      </Link>
      <button className="btn" type="button">
        Stakeholders
      </button>
    </div>
  </div>
);

export default LandingPage;

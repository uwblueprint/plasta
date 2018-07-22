import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = props => (
  <div className="page-wrapper landing-wrapper vcentre-outer">
    <div className="vcentre">
      <Link to="/admindash">
        <button className="btn" type="button">
          Projects
        </button>
      </Link>
      <Link to="/adminstakeholder">
        <button className="btn" type="button">
          Stakeholders
        </button>
      </Link>
    </div>
  </div>
);

export default LandingPage;

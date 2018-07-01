import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import './LandingPage.css';

const LandingPage = props => (
  <div class="page-wrapper landing-wrapper">
    <button className="button" type="button">
      Projects
    </button>
    <button className="button" type="button">
      Stakeholders
    </button>
  </div>
);

export default LandingPage;

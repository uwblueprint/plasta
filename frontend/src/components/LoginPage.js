import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';
import PropTypes from 'prop-types';
import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="page-wrapper login-wrapper ">
        <img alt="Plastics For Change" src="/images/pfc-logo.png" />
        <Form
          onSubmit={this.props.onSubmit}
          render={({ submitForm }) => (
            <form onSubmit={submitForm} className="login-form">
              <div className="input-block">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <Text placeholder="Email" className="block input-field" field="email" id="email" />
              </div>
              <div className="input-block">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <Text
                  className="block input-field"
                  field="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                />
              </div>
              <Link to="/landing">
                <button className="btn" type="submit">
                  Login
                </button>
              </Link>
            </form>
          )}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginPage;

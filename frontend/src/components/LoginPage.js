import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './input-components/TextInput.js';
import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="page-wrapper" id="login-wrapper">
        <img alt="Plastics For Change" src="/images/pfc-logo.png" />
        <form onSubmit={this.props.onSubmit} className="login-form">
          <div className="input-block">
            <label className="block" htmlFor="email">
              Email
            </label>
            <TextInput placeholder="Email" className="block input-field" onChange={() => {}} />
          </div>
          <div className="input-block">
            <label className="block" htmlFor="password">
              Password
            </label>
            <TextInput
              className="block input-field"
              placeholder="Password"
              type="password"
              onChange={() => {}}
            />
          </div>
          <button className="btn" type="submit" onClick={() => this.props.history.push('/landing')}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginPage;

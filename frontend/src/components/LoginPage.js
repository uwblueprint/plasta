import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import PropTypes from 'prop-types';
import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="page-wrapper login-wrapper vcentre-outer">
        <Form
          onSubmit={this.props.onSubmit}
          render={({ submitForm }) => (
            <form onSubmit={submitForm} className="login-form vcentre">
              <h1 className="title">Plastics For Change</h1>
              <div className="input-block">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <Text className="block input-field" field="email" id="email" />
              </div>
              <div className="input-block">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <Text
                  className="block input-field"
                  field="password"
                  type="password"
                  id="password"
                />
              </div>
              <div className="btn">
                <button className="btn" type="submit">
                  LOGIN
                </button>
              </div>
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

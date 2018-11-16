import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from './input-components/TextInput.js';
import { onFieldChange } from './utils/form';
import { userAuthentication } from '../actions';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = onFieldChange.bind(this);
    this.onSubmit = () => {
      // TODO (xin): LOGIN THROUGH BACKEND
    };
  }

  render() {
    return (
      <div className="page-wrapper" id="login-wrapper">
        <img alt="Plastics For Change" src="/images/pfc-logo.png" />
        <form onSubmit={this.props.onSubmit} className="login-form">
          <div className="input-block">
            <label className="block" htmlFor="email">
              Email
            </label>
            <TextInput
              placeholder="Email"
              className="block input-field"
              field="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="input-block">
            <label className="block" htmlFor="password">
              Password
            </label>
            <TextInput
              className="block input-field"
              placeholder="Password"
              type="password"
              field="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button type="button" onClick={this.onSubmit}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  vendors: state.vendors,
});

const mapDispatchToProps = dispatch => ({
  userAuthentication: payload => dispatch(userAuthentication(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
};

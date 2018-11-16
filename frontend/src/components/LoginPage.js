import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from './input-components/TextInput.js';
import { onFieldChange } from './utils/form';
import { userAuthentication } from '../actions';
import './LoginPage.css';
import { post } from './utils/requests';
import { Cookies } from 'react-cookie';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.userAuthentication({ email: this.state.email });

    post('/auth/login', loginData)
      .then(results => {
        console.log(results);
        console.log(results.access_token);
        Cookies.set('access_token', results.access_token);
        this.props.history.push('/landing');
      })
      .catch(err => {});
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

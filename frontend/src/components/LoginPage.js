import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from './input-components/TextInput.js';
import { post } from './utils/requests';
import { onFieldChange, ruleTypes } from './utils/form';
import { userAuthentication } from '../actions';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: '',
      errorMessage: '',
    };
    this.onChange = onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      submitted: true,
      errorMessage: '',
    });
    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };
    if (this.state.email && this.state.password) {
      post('/auth/login', loginData)
        .then(results => {
          this.props.userAuthentication(results.data);
          this.props.cookies.set('access_token', results.access_token);
          this.props.history.push('/landing');
        })
        .catch(err => {
          this.setState({
            errorMessage: 'Email or Password is invalid. Please try again.',
          });
        });
    }
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
              rules={[ruleTypes.FIELD_REQUIRED]}
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
              rules={[ruleTypes.FIELD_REQUIRED]}
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
  userAuthentication: currentUser => dispatch(userAuthentication(currentUser)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
};

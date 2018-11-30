import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from './input-components/TextInput.js';
import { post, get } from './utils/requests';
import { onFieldChange, ruleTypes } from './utils/form';
import { userAuthentication } from '../actions';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      email: '',
      password: '',
    };
    this.onChange = onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {
    if (!this.state.email || !this.state.password) return;
    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      const auth = await post('/auth/login', loginData);
      this.props.userAuthentication(auth.data);
      this.props.cookies.set('access_token', auth.access_token);
      this.props.history.push('/landing');
    } catch (err) {
      alert('Something went wrong.'); // TODO: NOTIFY ERROR AND LOG
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

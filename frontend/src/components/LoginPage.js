import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from './input-components/TextInput.js';
import { onFieldChange, ruleTypes } from './utils/form';
import { userAuthentication, loadVendors } from '../actions';
import { post, get } from './utils/requests';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      email: '',
      password: '',
      submitAttempted: false,
    };
    this.onChange = onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {
    if (!this.state.submitAttempted) this.setState({ submitAttempted: true });
    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      const auth = await post('/auth/login', loginData);
      const vendors = await get('/vendors');
      const userInfo = { userDetails: auth.data, userType: auth.data.vendor.vendor_type };
      this.props.loadVendors(vendors.data);
      this.props.userAuthentication(userInfo);
      this.props.cookies.set('access_token', auth.access_token);
    } catch (err) {
      alert('Unable to login.');
    } // TODO: NOTIFY ERROR AND LOG }
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

const mapDispatchToProps = dispatch => ({
  userAuthentication: currentUser => dispatch(userAuthentication(currentUser)),
  loadVendors: vendors => dispatch(loadVendors(vendors)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(LoginPage)
);

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
};

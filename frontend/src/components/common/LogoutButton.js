import React, { Component } from 'react';
import { delete_request } from '../utils/requests';
import './LogoutButton.css';

class LogoutButton extends Component {
  async logout() {
    try {
      await delete_request('/auth/logout', this.props.cookies.get('access_token'));
    } catch (err) {
      console.error(err);
      alert('Unable to logout.');
    }
    // delete the access_token cookie
    this.props.cookies.remove('access_token');
    // redirect to login screen
    window.location.href = '/';
  }

  render() {
    return (
      <button className="logout-button" onClick={() => this.logout()}>
        Log Out
      </button>
    );
  }
}

export default LogoutButton;

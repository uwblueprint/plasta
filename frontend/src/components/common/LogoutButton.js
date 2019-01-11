import React, { Component } from 'react';
import './LogoutButton.css';

class LogoutButton extends Component {
  logout() {
    // delete the access_token cookie by setting expiry date to a time in the past
    document.cookie = 'access_token' + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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

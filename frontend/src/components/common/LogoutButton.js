import React, { Component } from 'react';
import './LogoutButton.css';

class LogoutButton extends Component {
  logout() {
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

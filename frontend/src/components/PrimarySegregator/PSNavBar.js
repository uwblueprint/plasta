import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import './PrimarySegregator.css';
import * as Icons from '../../assets/icons';
import buy from './NavbarImages/buy.png';
import sell from './NavbarImages/sell.png';
import createnew from './NavbarImages/createnew.png';
import { Icon } from '@material-ui/core';

class PSNavBar extends Component {
  render() {
    return (
      <div id="nav-bar-wrapper">
        <nav className="navbar">
          <Link className="tab" to="/ps/transactions/buy">
            <div id="icon">{Icons.newBuy}</div>
          </Link>
          <Link className="tab" to="/ps/transactions/sell">
            <div id="icon">{Icons.sell}</div>
          </Link>
          <Link className="tab" to="/ps/stakeholders/new">
            <div id="icon">{Icons.newWastepicker}</div>
          </Link>
        </nav>
      </div>
    );
  }
}

export default PSNavBar;

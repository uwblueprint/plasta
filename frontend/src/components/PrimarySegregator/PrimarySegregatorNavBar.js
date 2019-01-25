import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import './PrimarySegregator.css';
import buy from './NavbarImages/buy.png';
import sell from './NavbarImages/sell.png';
import createnew from './NavbarImages/createnew.png';

class PrimarySegregatorBottomBar extends Component {
  render() {
    return (
      <div id="nav-bar-wrapper">
        <nav className="navbar">
          <Link className="tab" to="/ps/transactions/buy">
            <img src={buy} alt={'buy'} />
          </Link>
          <Link className="tab" to="/ps/transactions/sell">
            <img src={sell} alt={'sell'} />
          </Link>
          <Link className="tab" to="/ps/wastepickers/new">
            <img src={createnew} alt={'create new'} />
          </Link>
        </nav>
      </div>
    );
  }
}

export default PrimarySegregatorBottomBar;

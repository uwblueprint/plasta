import React, { Component, Fragment } from 'react';
import '../Navbar.css';
import transaction from './NavbarImages/transaction.png';
import buy from './NavbarImages/buy.png';
import sell from './NavbarImages/sell.png';
import createnew from './NavbarImages/createnew.png';

class DWCCBottomBar extends Component {
  render() {
    return (
      <div id="nav-bar-wrapper">
        <nav className="navbar">
          <a href="#" className="tab">
            <img src={transaction} alt={'transaction history'} className="image" />
          </a>
          <a href="#" className="tab">
            <img src={buy} alt={'buy'} className="image" />
          </a>
          <a href="#" className="tab">
            <img src={sell} alt={'sell'} className="image" />
          </a>
          <a href="#" className="tab">
            <img src={createnew} alt={'create new wastepicker'} className="image" />
          </a>
        </nav>
      </div>
    );
  }
}

export default DWCCBottomBar;

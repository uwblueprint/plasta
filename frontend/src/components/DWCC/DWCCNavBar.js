import React, { Component, Fragment } from 'react';
import '../Navbar.css';
import transaction from './NavbarImages/transaction.png';
import buy from './NavbarImages/buy.png';
import sell from './NavbarImages/sell.png';
import createnew from './NavbarImages/createnew.png';

class DWCCNavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <a href="#" className="button">
          <div className="transaction_history">
            <img src={transaction} alt={'transaction history'} className="navbar_button" />
          </div>
        </a>
        <a href="#" className="button">
          <div className="buy">
            <img src={buy} alt={'buy'} className="navbar_button" />
          </div>
        </a>
        <a href="#" className="button">
          <div className="sell">
            <img src={sell} alt={'sell'} className="navbar_button" />
          </div>
        </a>
        <a href="#" className="button">
          <div className="create_new">
            <img src={createnew} alt={'create new wastepicker'} className="navbar_button" />
          </div>
        </a>
      </div>
    );
  }
}

export default DWCCNavBar;

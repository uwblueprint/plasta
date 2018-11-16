import React, { Component } from 'react';
import '../Navbar.css';
import './DWCC.css';
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
            <img src={transaction} alt={'transactions'} />
          </a>
          <a className="tab" onClick={() => this.props.history.push('/dwcc/transactions/buy')}>
            <img src={buy} alt={'buy'} />
          </a>
          <a className="tab" onClick={() => this.props.history.push('/dwcc/transactions/sell')}>
            <img src={sell} alt={'sell'} />
          </a>
          <a className="tab" onClick={() => this.props.history.push('/dwcc/wastepickers/new')}>
            <img src={createnew} alt={'create new'} />
          </a>
        </nav>
      </div>
    );
  }
}

export default DWCCBottomBar;

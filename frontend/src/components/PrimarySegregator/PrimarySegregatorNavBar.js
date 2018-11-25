import React, { Component } from 'react';
import '../Navbar.css';
import './PrimarySegregator.css';
import transaction from './NavbarImages/transaction.png';
import buy from './NavbarImages/buy.png';
import sell from './NavbarImages/sell.png';
import createnew from './NavbarImages/createnew.png';

class PrimarySegregatorBottomBar extends Component {
  render() {
    return (
      <div id="nav-bar-wrapper">
        <nav className="navbar">
          <a className="tab">
            <img src={transaction} alt={'transactions'} />
          </a>
          <a className="tab" onClick={() => this.props.history.push('/ps/transactions/buy')}>
            <img src={buy} alt={'buy'} />
          </a>
          <a className="tab" onClick={() => this.props.history.push('/ps/transactions/sell')}>
            <img src={sell} alt={'sell'} />
          </a>
          <a className="tab" onClick={() => this.props.history.push('/ps/wastepickers/new')}>
            <img src={createnew} alt={'create new'} />
          </a>
        </nav>
      </div>
    );
  }
}

export default PrimarySegregatorBottomBar;

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { setTransactionView } from '../../actions';
import { TRANSACTION_TYPES } from '../utils/transactions';
import './HeaderBar.css';

const HeaderBar = props => {
  const { title, matIcon, showTransactionTypes, transactionType } = props.header;
  const isBuy = transactionType === TRANSACTION_TYPES.BUY;
  const height = showTransactionTypes ? '114px' : '54px';

  return (
    <div style={{ height }} className="header-bar white">
      {matIcon && (
        <i style={{ paddingLeft: '18px' }} className="icon material-icons">
          {matIcon}
        </i>
      )}
      <h1 className="page-title white">{title}</h1>
      {showTransactionTypes && (
        <div className="transaction-view-menu-wrapper">
          <button
            onClick={props.setTransactionToBuy}
            className={classNames(isBuy ? 'white' : 'light-grey')}
          >
            <i className="icon far fa-arrow-alt-circle-down" />
            <span>Buy</span>
          </button>
          <button
            onClick={props.setTransactionToSell}
            className={classNames(!isBuy ? 'white' : 'light-grey')}
          >
            <i className="icon far fa-arrow-alt-circle-up" />
            <span>Sell</span>
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  header: state.headerBar,
});

const mapDispatchToProps = dispatch => ({
  setTransactionToBuy: () => dispatch(setTransactionView(TRANSACTION_TYPES.BUY)),
  setTransactionToSell: () => dispatch(setTransactionView(TRANSACTION_TYPES.SELL)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);

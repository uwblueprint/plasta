import React, { Component } from 'react';
import TransactionTable from './TransactionTable';
import moment from 'moment';
import { withCookies } from 'react-cookie';
import './PrimarySegregator.css';
import 'react-table/react-table.css';
import {
  plasticOptionsByName,
  getTotalPlasticsPrice,
  getTotalPlasticsQuantity,
} from '../utils/project';
import { get } from './../utils/requests';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { filterBuyTransactions, filterSellTransactions } from './../utils/transactions';
import { findVendorById } from '../utils/vendors.js';
import { loadTransactions } from '../../actions';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    id: 'price',
    Header: 'Rupees',
    accessor: transaction => getTotalPlasticsPrice(transaction),
  },
  {
    id: 'plasticQuantity',
    Header: 'Kilograms',
    accessor: transaction => getTotalPlasticsQuantity(transaction),
  },
  {
    id: 'plasticType',
    Header: 'Type',
    accessor: transaction =>
      transaction.plastics
        .map(plastic => plasticOptionsByName.get(plastic.plastic_type).label)
        .join(', '),
  },
  {
    id: 'saleDate',
    Header: 'Date',
    accessor: transaction => {
      return moment(transaction.sale_date)
        .local()
        .format('DD-MM-YYYY hh:mm:ss a');
    },
  },
];

class PrimarySegregatorTransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5,
    };
  }
  static propTypes = {
    currentId: PropTypes.number.isRequired,
    vendors: PropTypes.array.isRequired,
  };

  componentDidMount() {
    get(
      `/vendors/${this.props.currentId}/transactions`,
      this.props.cookies.get('access_token')
    ).then(transactions => this.props.loadTransactions(transactions.data));
  }

  filterTransactions(transactionType) {
    const filteredTransactions = [];
    if (transactionType === 'buy') {
      filterBuyTransactions(this.props.transactions, this.props.currentId).forEach(transaction => {
        const vendor = findVendorById(this.props.vendors, transaction.from_vendor_id);
        if (!vendor) return;
        filteredTransactions.push({ ...transaction, name: vendor.name });
      });
    } else {
      filterSellTransactions(this.props.transactions, this.props.currentId).forEach(transaction => {
        const vendor = findVendorById(this.props.vendors, transaction.to_vendor_id);
        if (!vendor) return;
        filteredTransactions.push({ ...transaction, name: vendor.name });
      });
    }
    return filteredTransactions;
  }

  render() {
    return (
      <div>
        <div id="primary-segregator-page-wrapper">
          <h1> Transaction History </h1>
          <h2>Buy</h2>
          <TransactionTable
            showPagination={false}
            data={this.filterTransactions('buy')}
            columns={columns}
            defaultPageSize={this.state.pageSize}
            className="-striped-highlight table"
          />
          <h2>Sell</h2>
          <TransactionTable
            showPagination={false}
            data={this.filterTransactions('sell')}
            columns={columns}
            defaultPageSize={this.state.pageSize}
            className="-striped-highlight table"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentId: state.currentUser.userDetails.vendor_id,
  vendors: state.vendors,
  transactions: state.transactions,
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: payload => dispatch(loadTransactions(payload)),
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrimarySegregatorTransactionHistory)
);

import ReactTable from 'react-table';
import React, { Component } from 'react';
import moment from 'moment';
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
      buyTransactions: [],
      sellTransactions: [],
    };
  }
  static propTypes = {
    currentId: PropTypes.number.isRequired,
    vendors: PropTypes.array.isRequired,
  };

  componentDidMount() {
    get(`/vendors/${this.props.currentId}/transactions`).then(results => {
      const transactions = results.data;
      const buyTransactions = filterBuyTransactions(transactions, this.props.currentId).map(
        transaction => {
          const vendor = findVendorById(this.props.vendors, transaction.from_vendor_id);
          if (!vendor) return;
          return { ...transaction, name: vendor.name };
        }
      );
      const sellTransactions = filterSellTransactions(transactions, this.props.currentId).map(
        transaction => {
          const vendor = findVendorById(this.props.vendors, transaction.to_vendor_id);
          if (!vendor) return;
          return { ...transaction, name: vendor.name };
        }
      );
      this.setState({ buyTransactions: buyTransactions, sellTransactions: sellTransactions });
    });
  }

  render() {
    return (
      <div>
        <div id="primary-segregator-page-wrapper">
          <h1> Transaction History </h1>
          <h2>Buy</h2>
          <ReactTable
            showPagination={false}
            data={this.state.buyTransactions}
            columns={columns}
            defaultPageSize={3}
            className="-striped-highlight table"
          />
          <h2>Sell</h2>
          <ReactTable
            showPagination={false}
            data={this.state.sellTransactions}
            columns={columns}
            defaultPageSize={3}
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
});

export default connect(mapStateToProps)(PrimarySegregatorTransactionHistory);

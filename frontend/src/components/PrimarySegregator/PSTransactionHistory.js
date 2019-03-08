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
} from '../utils/plastic';
import { get } from './../utils/requests';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  filterBuyTransactions,
  filterSellTransactions,
  TRANSACTION_TYPES,
} from '../utils/transactions';
import { findVendorById } from '../utils/vendors.js';
import { loadTransactions, setHeaderBar } from '../../actions';

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

function logMissingVendor(vendors_list, missing_vendor_id) {
  console.group('Missing Vendor');
  console.error('Vendor missing with following params (vendors list, vendor id):');
  console.error(vendors_list);
  console.error(missing_vendor_id);
  console.groupEnd();
}

class PSTransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5,
      transactionType: 'Buy',
    };
  }
  static propTypes = {
    currentId: PropTypes.number.isRequired,
    vendors: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.setHeaderBar({
      title: 'Transactions',
      matIcon: 'compare_arrows',
      showTransactionTypes: true,
    });

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
        if (!vendor) {
          logMissingVendor(this.props.vendors, transaction.from_vendor_id);
          alert(
            `Missing vendor from buy transactions table with vendor id ${
              transaction.from_vendor_id
            }. Please try refreshing.`
          );
          return;
        }
        filteredTransactions.push({ ...transaction, name: vendor.name });
      });
    } else {
      filterSellTransactions(this.props.transactions, this.props.currentId).forEach(transaction => {
        const vendor = findVendorById(this.props.vendors, transaction.to_vendor_id);
        if (!vendor) {
          logMissingVendor(this.props.vendors, transaction.to_vendor_id);
          alert(
            `Missing vendor from sell transactions table with vendor id ${
              transaction.to_vendor_id
            }. Please try refreshing.`
          );
          return;
        }
        filteredTransactions.push({ ...transaction, name: vendor.name });
      });
    }
    return filteredTransactions;
  }

  render() {
    const transactionType = this.props.header.transactionType;
    return (
      <div id="primary-segregator-page-wrapper">
        {transactionType === TRANSACTION_TYPES.BUY ? (
          <TransactionTable
            showPagination={false}
            data={this.filterTransactions('buy')}
            columns={columns}
            defaultPageSize={this.state.pageSize}
            className="-striped-highlight table"
          />
        ) : (
          <TransactionTable
            showPagination={false}
            data={this.filterTransactions('sell')}
            columns={columns}
            defaultPageSize={this.state.pageSize}
            className="-striped-highlight table"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentId: state.currentUser.userDetails.vendor_id,
  vendors: state.vendors,
  transactions: state.transactions,
  header: state.headerBar,
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: payload => dispatch(loadTransactions(payload)),
  setHeaderBar: payload => dispatch(setHeaderBar(payload)),
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PSTransactionHistory)
);

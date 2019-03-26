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
import * as Icons from '../../assets/icons';
import Modal from '../common/Modal';

const columns = [
  {
    Header: <span className="table-header">{Icons.name} Name</span>,
    accessor: 'name',
  },
  {
    id: 'price',
    maxWidth: 80,
    Header: <div>{Icons.rupee} Rs</div>,
    accessor: transaction => getTotalPlasticsPrice(transaction),
  },
  {
    id: 'plasticQuantity',
    maxWidth: 80,
    Header: <div>{Icons.weight} Kg</div>,
    accessor: transaction => getTotalPlasticsQuantity(transaction),
  },
  {
    id: 'plasticType',
    Header: <div>{Icons.plasticType} Type</div>,
    accessor: transaction =>
      transaction.plastics
        .map(plastic => plasticOptionsByName.get(plastic.plastic_type).label)
        .join(', '),
  },
  {
    id: 'saleDate',
    Header: <span>{Icons.calendar} Date</span>,
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
      showDeleteModal: false,
    };
  }
  static propTypes = {
    currentId: PropTypes.number.isRequired,
    vendors: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.setHeaderBar({
      title: 'Transactions',
      icon: Icons.transaction,
      showLogout: true,
      showTransactionTypes: true,
      transactionType: TRANSACTION_TYPES.BUY,
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

  deleteRow = () => {
    const rowInd = this.state.rowIndex;
    const transactions = [
      this.props.transactions.slice(0, rowInd),
      this.props.transactions.slice(rowInd),
    ];
    this.setState({ showDeleteModal: false });
    return transactions;
  };

  onClick = (e, table) => {
    this.setState({
      showDeleteModal: true,
      rowIndex: table.rowinfo.index,
    });
  };

  hideModal = () => {
    this.setState({ showDeleteModal: false });
  };

  render() {
    const transactionType = this.props.header.transactionType;
    const data =
      transactionType === TRANSACTION_TYPES.BUY
        ? this.filterTransactions('buy')
        : this.filterTransactions('sell');

    return (
      <div id="primary-segregator-page-wrapper">
        {this.state.showDeleteModal && (
          <Modal
            title="Delete Transaction?"
            message={`This will delete the transaction from ${
              data[this.state.rowIndex].name
            } from the records.`}
            onAccept={this.deleteRow}
            onCancel={this.hideModal}
          />
        )}

        <TransactionTable
          showPagination={false}
          data={data}
          columns={columns}
          defaultPageSize={this.state.pageSize}
          className="-striped-highlight table"
          onClick={this.onClick}
        />
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

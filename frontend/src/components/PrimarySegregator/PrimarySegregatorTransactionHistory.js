import ReactTable from 'react-table';
import React, { Component } from 'react';
import PrimarySegregatorBottomBar from './PrimarySegregatorNavBar.js';
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

const columns = [
  {
    Header: 'Name',
    accessor: 'to_vendor.name',
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

const dummyTransactions = [
  {
    id: 1,
    project_id: 1,
    from_vendor: {
      id: 1,
      vendor_type: 'wastepicker',
      name: 'Rahul',
      meta_data: {},
      created_at: Date.now(),
    },
    to_vendor: {
      id: 2,
      vendor_type: 'dwcc',
      name: 'Rohit',
      meta_data: {},
      created_at: Date.now(),
    },
    to_acknowledged: false,
    acknowledged_at: null,
    sale_date: Date.now(),
    plastics: [
      {
        transaction_id: 100,
        plastic_type: 'brown_pet',
        quantity: 99,
        price: 10.99,
      },
    ],
    creator_id: 3,
    created_at: Date.now(),
  },
  {
    id: 2,
    project_id: 3,
    from_vendor: {
      id: 1,
      vendor_type: 'wholesaler',
      name: 'Lakhan',
      meta_data: {},
      created_at: Date.now(),
    },
    to_vendor: {
      id: 2,
      vendor_type: 'manufacturer',
      name: 'Mohit',
      meta_data: {},
      created_at: Date.now(),
    },
    to_acknowledged: false,
    acknowledged_at: null,
    sale_date: Date.now(),
    plastics: [
      {
        transaction_id: 100,
        plastic_type: 'blue_pet',
        quantity: 99,
        price: 5.99,
      },
      {
        transaction_id: 100,
        plastic_type: 'brown_pet',
        quantity: 90,
        price: 10.99,
      },
      {
        transaction_id: 100,
        plastic_type: 'green_pet',
        quantity: 80,
        price: 2.79,
      },
    ],
    creator_id: 5,
    created_at: Date.now(),
  },
];

class PrimarySegregatorTransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // TODO(Nick): Wait for xin's PR in order to use currentUser object
    get(`/vendors/${1}/transactions`).then(results => {
      console.log(results.data);
      this.setState({ transactions: results.data });
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
            data={dummyTransactions}
            columns={columns}
            defaultPageSize={3}
            className="-striped-highlight table"
          />
          <h2>Sell</h2>
          <ReactTable
            showPagination={false}
            data={dummyTransactions}
            columns={columns}
            defaultPageSize={3}
            className="-striped-highlight table"
          />
        </div>
        <PrimarySegregatorBottomBar history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(PrimarySegregatorTransactionHistory);

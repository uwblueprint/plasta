import ReactTable from 'react-table';
import React, { Component } from 'react';
import moment from 'moment';
import './DwccTransactionHistory.css';
import 'react-table/react-table.css';
import {
  plasticOptionsByName,
  getTotalPlasticsPrice,
  getTotalPlasticsQuantity,
} from './utils/project';

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
        plastic_type: 'pet_light_blue',
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

class DwccTransactionHistory extends Component {
  render() {
    return (
      <div>
        <h1> Transaction History </h1>
        <h2>Buy</h2>
        <ReactTable
          data={dummyTransactions}
          columns={columns}
          defaultPageSize={5}
          className="-striped-highlight table"
        />
        <h2>Sell</h2>
        <ReactTable
          data={dummyTransactions}
          columns={columns}
          defaultPageSize={5}
          className="-striped-highlight table"
        />
      </div>
    );
  }
}

export default DwccTransactionHistory;

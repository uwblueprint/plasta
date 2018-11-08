import ReactTable from 'react-table';
import React, { Component } from 'react';
import moment from 'moment';
import './TransactionHistory.css';
import 'react-table/react-table.css';
import { getTotalPlasticsPrice, getTotalPlasticsQuantity } from '../utils/project';

const columns = [
  {
    Header: 'To',
    accessor: 'to_vendor.name',
  },
  {
    Header: 'From',
    accessor: 'from_vendor.name',
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
    accessor: transaction => transaction.plastics.map(plastic => plastic.plastic_type).join(', '),
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
      name: 'James Michael McAdoo',
      meta_data: {},
      created_at: Date.now(),
    },
    to_vendor: {
      id: 2,
      vendor_type: 'dwcc',
      name: 'Stephen Curry',
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
      name: 'Lamarcus Aldridge',
      meta_data: {},
      created_at: Date.now(),
    },
    to_vendor: {
      id: 2,
      vendor_type: 'manufacturer',
      name: 'Lebron James',
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
        price: 10.99,
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

class TransactionHistory extends Component {
  render() {
    // TODO (ahmed): Once backend is implemented, I can use that data
    // const { data } = this.props;
    return (
      <div>
        <h1> Transaction History </h1>
        <ReactTable
          data={dummyTransactions}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight table"
        />
      </div>
    );
  }
}

export default TransactionHistory;

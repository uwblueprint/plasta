import ReactTable from 'react-table';
import React, { Component } from 'react';
import './TransactionHistory.css';
import 'react-table/react-table.css';

const columns = [
  {
    Header: 'To',
    accessor: 'to_vendor_id',
  },
  {
    Header: 'From',
    accessor: 'from_vendor_id',
  },
  {
    Header: 'Rupees',
    accessor: 'price',
  },
  {
    Header: 'Kilograms',
    accessor: 'plastics.quantity',
  },
  {
    Header: 'Type',
    accessor: 'plastics.plastic_type',
  },
  {
    Header: 'Date',
    accessor: 'sale_date',
  },
];

const dummyTransactions = [
  {
    id: 1,
    project_id: 1,
    from_vendor_id: 1,
    to_vendor_id: 2,
    to_acknowledged: false,
    acknowledged_at: null,
    price: 10.99,
    sale_date: Date.now(),
    plastics: {
      transaction_id: 100,
      plastic_type: 'brown_pet',
      quantity: 99,
      price: 10.99,
    },
    creator_id: 3,
    created_at: Date.now(),
  },
  {
    id: 2,
    project_id: 3,
    from_vendor_id: 1,
    to_vendor_id: 2,
    to_acknowledged: false,
    acknowledged_at: null,
    price: 10.99,
    sale_date: Date.now(),
    plastics: {
      transaction_id: 100,
      plastic_type: 'pet_light_blue',
      quantity: 99,
      price: 10.99,
    },
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

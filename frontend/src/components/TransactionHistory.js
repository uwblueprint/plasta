import ReactTable from 'react-table';
import React, { Component } from 'react';
import './TransactionHistory.css';
import 'react-table/react-table.css';
import { fakeData } from './fakeData.js';

const columns = [
  {
    Header: 'To',
    accessor: 'to',
  },
  {
    Header: 'From',
    accessor: 'from',
  },
  {
    Header: 'Rupees',
    accessor: 'rs',
  },
  {
    Header: 'Kilograms',
    accessor: 'kg',
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
];

class TransactionHistory extends Component {
  constructor() {
    super();
    this.state = {
      data: fakeData,
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <h1> Transaction History </h1>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight table"
        />
      </div>
    );
  }
}

export default TransactionHistory;

import React, { Component } from 'react';
import ReactTable from 'react-table';
import './TransactionTable.css';

export default class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
    this.pageForward = this.pageForward.bind(this);
    this.pageBack = this.pageBack.bind(this);
  }

  pageForward() {
    this.setState(state => {
      return { currentPage: state.currentPage + 1 };
    });
  }

  pageBack() {
    this.setState(state => {
      return { currentPage: state.currentPage - 1 };
    });
  }

  render() {
    const pageSize = this.props.defaultPageSize || 5;
    const totalPages = this.props.data ? Math.ceil(this.props.data.length / pageSize) - 1 : 0;
    return (
      <div className="table-wrapper">
        <ReactTable
          {...this.props}
          pageSize={pageSize}
          page={this.state.currentPage}
          showPagination={false}
        />
        {this.state.currentPage > 0 && (
          <button className="chevron-up chevron" onClick={this.pageBack}>
            <i className="fas fa-chevron-up" />
          </button>
        )}
        {this.state.currentPage < totalPages && (
          <button className="chevron-down chevron" onClick={this.pageForward}>
            <i className="fas fa-chevron-down" />
          </button>
        )}
      </div>
    );
  }
}

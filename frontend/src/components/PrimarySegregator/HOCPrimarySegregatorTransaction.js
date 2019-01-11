import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onFieldChange, isFormValid, onValidation } from '../utils/form';
import CancelButton from '../common/CancelButton.js';
import LogoutButton from '../common/LogoutButton.js';
import './../FormPage.css';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import PrimarySegregatorTransaction from './PrimarySegregatorTransaction';

export const transactionTypes = {
  BUY: 1,
  SELL: 2,
};

function composeTransaction(members) {
  return class TransactionContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: {},
        submitAttempted: false,
        stakeholderName: {},
        plasticType: {},
        unitPrice: '',
        weight: '',
        transactionDate: '',
        showModal: false,
        stakeholderOptions: [],
      };
      this.onSubmit = members.onSubmit.bind(this);
      this.getStakeholderOptions = members.getStakeholderOptions.bind(this);
      this.onFieldChange = onFieldChange.bind(this);
      this.handleDayChange = this.handleDayChange.bind(this);
      this.handleNewStakeholder = this.handleNewStakeholder.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.isFormValid = isFormValid.bind(this);
      this.onValidation = onValidation.bind(this);
    }

    static propTypes = {
      currentUser: PropTypes.object.isRequired,
      vendors: PropTypes.array.isRequired,
    };

    componentDidMount() {
      this.setState({ stakeholderOptions: this.getStakeholderOptions() });
    }

    hideModal() {
      this.setState({ showModal: false });
    }

    handleNewStakeholder() {
      this.setState({ showModal: true });
    }

    handleDayChange(input, value) {
      this.setState({ [input]: moment(value).format('YYYY-MM-DD') });
    }

    render() {
      return (
        <div id="transactions-wrapper">
          <CancelButton context={this.context} />
          <LogoutButton />
          <PrimarySegregatorTransaction
            title={members.transactionType === transactionTypes.BUY ? 'Buy' : 'Sell'}
            transactionType={members.transactionType}
            onSubmit={this.onSubmit}
            onValidation={this.onValidation}
            isFormValid={this.isFormValid}
            handleDayChange={this.handleDayChange}
            handleNewStakeholder={this.handleNewStakeholder}
            showModal={this.showModal}
            hideModal={this.hideModal}
            onFieldChange={this.onFieldChange}
            stakeholderOptions={this.state.stakeholderOptions}
            {...this.state}
          />
        </div>
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    vendors: state.vendors,
  };
};

function composeTransactionsWithStore(members) {
  return connect(
    mapStateToProps,
    null
  )(composeTransaction(members));
}

export default composeTransactionsWithStore;

import React, { Component } from 'react';
import { onFieldChange, isFormValid, onValidation } from '../utils/form';
import CancelButton from '../common/CancelButton.js';
import './../FormPage.css';
import moment from 'moment';
import DWCCTransaction from './DWCCTransaction';

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
        unitPrice: 0,
        weight: 0,
        transactionDate: '',
        showModal: false,
      };
      console.log(members);
      this.onSubmit = members.onSubmit.bind(this);
      this.onFieldChange = onFieldChange.bind(this);
      this.handleDayChange = this.handleDayChange.bind(this);
      this.handleNewStakeholder = this.handleNewStakeholder.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.isFormValid = isFormValid.bind(this);
      this.onValidation = onValidation.bind(this);
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
          <DWCCTransaction
            title={'Buy'}
            transactionType={members.transactionType}
            onSubmit={this.onSubmit}
            onValidation={this.onValidation}
            handleDayChange={this.handleDayChange}
            stakeholderOptions={staticBuyStakeholders} // TODO: Get DWCC & Wastepickers
            handleNewStakeholder={this.handleNewStakeholder}
            showModal={this.showModal}
            hideModal={this.hideModal}
            onFieldChange={this.onFieldChange}
            {...this.state}
          />
        </div>
      );
    }
  };
}

const staticBuyStakeholders = [{ label: 'DWCC 1', value: '1' }];

export default composeTransaction;

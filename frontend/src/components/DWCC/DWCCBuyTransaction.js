import React, { Component } from 'react';
import moment from 'moment';
import { fieldToLabelMap } from '../utils/transactions';
import DWCCTransaction, { transactionTypes } from './DWCCTransaction';
import CancelButton from '../common/CancelButton.js';
import { post } from '../utils/requests';
import './../FormPage.css';

export default class DWCCBuyTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: { stakeholderName: '', plasticType: '', unitPrice: '', weight: '' },
      stakeholderName: {},
      plasticType: {},
      unitPrice: 0,
      weight: 0,
      transactionDate: '',
      showModal: false,
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateRequiredField = this.validateRequiredField.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleNewStakeholder = this.handleNewStakeholder.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  handleNewStakeholder() {
    this.setState({ showModal: true });
  }

  validateRequiredField(field) {
    const fieldObj = this.state[field.key];
    const isFilled = Array.isArray(fieldObj) ? fieldObj.length !== 0 : fieldObj;
    this.setState(currentState => {
      currentState.errors[field.key] = isFilled ? '' : `${fieldToLabelMap[field.key]} is required`;
      return currentState;
    });
  }

  validateAll() {
    Object.keys(this.state.errors).forEach(field => {
      this.validateRequiredField({ key: field });
    });
  }

  isFormValid() {
    this.validateAll();
    return Object.values(this.state.errors).reduce((prev, err) => {
      return prev && !err;
    }, true);
  }

  handleDayChange(input, value) {
    this.setState({ [input]: moment(value).format('YYYY-MM-DD') });
  }

  onSubmit() {
    if (!this.isFormValid()) {
      alert('Please resolve errors');
      return;
    }
    const totalPrice = this.state.unitPrice * this.state.weight;
    const transactionData = {
      // TODO(Nick): Get from_vendor_id & creator_id from user object in Redux store
      project_id: 1,
      from_vendor_id: this.state.stakeholderName.value,
      to_vendor_id: 1,
      unitPrice: totalPrice,
      plastics: [
        {
          plastic_type: this.state.plasticType.value,
          quantity: this.state.weight,
          unitPrice: totalPrice,
        },
      ],
      sale_date: this.state.transactionDate,
      creator_id: 1,
    };
    post('/vendors/1/transactions', transactionData).catch(err => {}); // TODO(Nick): Add Error catching.
  }
  render() {
    return (
      <div id="transactions-wrapper">
        <CancelButton context={this.context} />
        <DWCCTransaction
          title={'Buy'}
          transactionType={transactionTypes.BUY}
          onSubmit={this.onSubmit}
          onFieldChange={this.onFieldChange}
          validateRequiredField={this.validateRequiredField}
          validateAll={this.validateAll}
          isFormValid={this.isFormValid}
          handleDayChange={this.handleDayChange}
          stakeholderOptions={staticBuyStakeholders} // TODO: Get DWCC & Wastepickers
          handleNewStakeholder={this.handleNewStakeholder}
          showModal={this.showModal}
          hideModal={this.hideModal}
          {...this.state}
        />
      </div>
    );
  }
}

const staticBuyStakeholders = [{ label: 'DWCC 1', value: '1' }];

import React, { Component } from 'react';
import moment from 'moment';
import { fieldToLabelMap } from '../utils/transactions';
import DWCCTransaction, { transactionTypes } from './DWCCTransaction';
import CancelButton from '../common/CancelButton.js';
import './../FormPage.css';

export default class DWCCSellTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        stakeholderName: '',
        plasticType: '',
        price: '',
        weight: '',
      },
      stakeholderName: '',
      plasticType: {},
      price: '',
      weight: '',
      transactionDate: '',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateRequiredField = this.validateRequiredField.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
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
    this.setState({
      [input]: moment(value).format('YYYY-MM-DD'),
    });
  }

  onSubmit() {
    if (!this.isFormValid()) {
      alert('Please resolve errors');
      return;
    }
    // TODO: send POST with Buy transaction data
    // post('/projects', newProjectData).catch(err => {});
  }
  render() {
    return (
      <div id="transactions-wrapper">
        <CancelButton context={this.context} />
        <DWCCTransaction
          title={'Sell'}
          transactionType={transactionTypes.SELL}
          onSubmit={this.onSubmit}
          onFieldChange={this.onFieldChange}
          validateRequiredField={this.validateRequiredField}
          validateAll={this.validateAll}
          isFormValid={this.isFormValid}
          handleDayChange={this.handleDayChange}
          stakeholderOptions={staticSellStakeholders} //TODO: GET Sell Stakeholders from DB
          {...this.state}
        />
      </div>
    );
  }
}

const staticSellStakeholders = [
  { label: 'Wholesaler 1', value: 'WS1' },
  { label: 'Wholesaler 2', value: 'WS2' },
  { label: 'DWCC 1', value: 'DWCC' },
];

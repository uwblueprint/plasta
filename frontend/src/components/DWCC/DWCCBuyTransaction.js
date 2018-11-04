import React, { Component } from 'react';
import moment from 'moment';
// import { post } from './utils/requests';
import { fieldToLabelMap } from '../utils/transactions';

import DWCCTransaction from './DWCCTransaction';

const staticBuyStakeholders = [
  { label: 'Rahul Gupta', value: 'WP1' },
  { label: 'Rohit Patel', value: 'WP2' },
  { label: 'Lakhan Bakshi', value: 'WP2' },
  { label: 'DWCC 1', value: 'DWCC1' },
  { label: 'DWCC 2', value: 'DWCC2' },
];

export default class DWCCBuyTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        stakeholderName: '',
        plasticType: '',
        price: '',
        weight: '',
        transactionDate: '',
      },
      stakeholderName: '',
      plasticType: '',
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
    // post('/projects', newProjectData).catch(err => {});
    console.log(this.state);
  }
  render() {
    return (
      <DWCCTransaction
        title={'Buy'}
        onSubmit={this.onSubmit}
        onFieldChange={this.onFieldChange}
        validateRequiredField={this.validateRequiredField}
        validateAll={this.validateAll}
        isFormValid={this.isFormValid}
        handleDayChange={this.handleDayChange}
        stakeholderOptions={staticBuyStakeholders}
        {...this.state}
      />
    );
  }
}

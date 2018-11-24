import React, { Component } from 'react';
import moment from 'moment';
import { fieldToLabelMap } from '../utils/transactions';
import PrimarySegregatorTransaction, { transactionTypes } from './PrimarySegregatorTransaction';
import CancelButton from '../common/CancelButton.js';
import { post } from '../utils/requests';
import { connect } from 'react-redux';
import './../FormPage.css';
import PropTypes from 'prop-types';

class PrimarySegregatorBuyTransaction extends Component {
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
      from_vendor_id: this.state.stakeholderName.value,
      to_vendor_id: this.props.currentVendorId,
      price: totalPrice,
      plastics: [
        {
          plastic_type: this.state.plasticType.value,
          quantity: this.state.weight,
          price: totalPrice,
        },
      ],
      sale_date: this.state.transactionDate,
      creator_id: this.currentVendorId,
    };
    post('/vendors/1/transactions', transactionData).catch(err => {
      alert('There was a problem submitting the transaction. Please try again.');
    });
  }
  render() {
    return (
      <div id="transactions-wrapper">
        <CancelButton context={this.context} />
        <PrimarySegregatorTransaction
          title={'Buy'}
          transactionType={transactionTypes.BUY}
          onSubmit={this.onSubmit}
          onFieldChange={this.onFieldChange}
          validateRequiredField={this.validateRequiredField}
          validateAll={this.validateAll}
          isFormValid={this.isFormValid}
          handleDayChange={this.handleDayChange}
          stakeholderOptions={staticBuyStakeholders} // TODO: Get Primary Segregators & Wastepickers
          handleNewStakeholder={this.handleNewStakeholder}
          showModal={this.showModal}
          hideModal={this.hideModal}
          {...this.state}
        />
      </div>
    );
  }
}

const staticBuyStakeholders = [{ label: 'Primary Segregator 1', value: '1' }];

const mapStateToProps = state => {
  return {
    currentVendorId: state.currentUser.vendor_id,
  };
};

PrimarySegregatorBuyTransaction.propTypes = {
  currentVendorId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(PrimarySegregatorTransaction);

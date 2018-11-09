import React, { Component } from 'react';
import FormSection from '../input-components/FormSection';
import SearchSelect from '../input-components/SearchSelect';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TextInput from '../input-components/TextInput';
import './../FormPage.css';
import PropTypes from 'prop-types';
import InvalidInputMessage from '../InvalidInputMessage';
import CreatableSelect from 'react-select/lib/Creatable';
import Modal from '../input-components/Modal';

export const transactionTypes = {
  BUY: 1,
  SELL: 2,
};
export default class DWCCTransaction extends Component {
  constructor(props) {
    super(props);
    this.buyStakeholderSelect = this.buyStakeholderSelect.bind(this);
    this.sellStakeholderSelect = this.sellStakeholderSelect.bind(this);
  }
  buyStakeholderSelect() {
    return (
      <React.Fragment>
        <CreatableSelect
          field="stakeholderName"
          selectedOption={this.props.stakeholderName}
          options={this.props.stakeholderOptions}
          onChange={this.props.onFieldChange}
          onBlur={this.props.validateRequiredField}
          onNewOptionClick={this.props.handleNewStakeholder}
          promptTextCreator={search => `${search} not found, create a new stakeholder`}
        />
        <Modal show={this.props.showModal} handleClose={this.props.hideModal}>
          <h1>Create a new...</h1>
          <button>Wastepicker</button>
          <button>DWCC</button>
        </Modal>
      </React.Fragment>
    );
  }

  sellStakeholderSelect() {
    return (
      <SearchSelect
        field="stakeholderName"
        selectedOption={this.props.stakeholderName}
        options={this.props.stakeholderOptions}
        onChange={this.props.onFieldChange}
        onBlur={this.props.validateRequiredField}
      />
    );
  }

  render() {
    return (
      <div className="page-wrapper" id="transactions-wrapper">
        <h1>{this.props.title}</h1>
        <p className="required-field-notif">
          All fields marked with <b>*</b> are required.
        </p>
        <FormSection
          className="formsection"
          title={`${this.props.transactionType === transactionTypes.BUY ? `From` : `To`} *`}
        >
          {this.props.transactionType === transactionTypes.BUY //TODO: Modal route to Create DWCC & Wastepicker
            ? this.buyStakeholderSelect()
            : this.sellStakeholderSelect()}
          {this.props.errors.stakeholderName && (
            <InvalidInputMessage showIcon message={this.props.errors.stakeholderName} />
          )}
        </FormSection>

        <FormSection className="formsection" title="Plastic Type *">
          <SearchSelect
            field="plasticType"
            selectedOption={this.props.plasticType}
            options={staticPlasticTypes}
            onChange={this.props.onFieldChange}
            onBlur={this.props.validateRequiredField}
          />
          {this.props.errors.plasticType && (
            <InvalidInputMessage showIcon message={this.props.errors.plasticType} />
          )}
        </FormSection>
        <FormSection className="formsection" title="Amount *">
          <TextInput
            id="price"
            className="half-width inline margin-right-20"
            field="price"
            rightlabel=" ₹/Kg"
            value={this.props.price}
            placeholder={'0.00'}
            type="number"
            onChange={this.props.onFieldChange}
            onBlur={this.props.validateRequiredField}
          />

          <TextInput
            id="weight"
            className="half-width inline"
            field="weight"
            rightlabel=" Kg"
            type="number"
            value={this.props.weight}
            placeholder={'0'}
            onChange={this.props.onFieldChange}
            onBlur={this.props.validateRequiredField}
          />
          {this.props.errors.price && (
            <InvalidInputMessage showIcon message={this.props.errors.price} />
          )}
          {this.props.errors.weight && (
            <InvalidInputMessage showIcon message={this.props.errors.weight} />
          )}
        </FormSection>
        <FormSection className="formsection" title="Date">
          <DayPickerInput
            className="date-input-field"
            placeholder="YYYY-MM-DD"
            onDayChange={day => this.props.handleDayChange('transactionDate', day)}
          />
        </FormSection>
        <button
          type="submit"
          onClick={this.props.onSubmit}
          className="btn-dark bg-green uppercase margin-top"
        >
          Submit
        </button>
      </div>
    );
  }
}

const staticPlasticTypes = [
  { label: 'PET', value: 'p' },
  { label: 'Pugga', value: 'WS2' },
  { label: 'HDP', value: 'WS2' },
  { label: 'Films', value: 'WS2' },
];

DWCCTransaction.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  validateRequiredField: PropTypes.func.isRequired,
  validateAll: PropTypes.func.isRequired,
  isFormValid: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  stakeholderOptions: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleNewStakeholder: PropTypes.func,
  showModal: PropTypes.bool,
  hideModal: PropTypes.func,
  transactionType: PropTypes.number.isRequired,
  // field values
  price: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  plasticType: PropTypes.object.isRequired,
  stakeholderName: PropTypes.string.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSection from '../input-components/FormSection';
import SearchSelect from '../input-components/SearchSelect';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TextInput from '../input-components/TextInput';
import { withRouter } from 'react-router-dom';
import CreateStakeholderModal from './CreateStakeholderModal';
import OnSubmitButton from '../common/OnSubmitButton';
import { transactionTypes } from './HOCPrimarySegregatorTransaction';
import { ruleTypes } from '../utils/form';
import './../FormPage.css';

class PrimarySegregatorTransaction extends Component {
  constructor(props) {
    super(props);
    this.buyStakeholderSelect = this.buyStakeholderSelect.bind(this);
    this.sellStakeholderSelect = this.sellStakeholderSelect.bind(this);
  }
  buyStakeholderSelect() {
    return (
      <React.Fragment>
        <SearchSelect
          createable
          field="stakeholderName"
          value={this.props.stakeholderName}
          options={this.props.stakeholderOptions}
          onChange={this.props.onFieldChange}
          onNewOptionClick={this.props.handleNewStakeholder}
          promptTextCreator={search => `${search} not found, create a new stakeholder`}
          onValidation={this.props.onValidation}
          rules={[ruleTypes.FIELD_REQUIRED]}
          showErrors={this.props.submitAttempted}
        />
        <CreateStakeholderModal show={this.props.showModal} handleClose={this.props.hideModal} />
      </React.Fragment>
    );
  }

  sellStakeholderSelect() {
    return (
      <SearchSelect
        field="stakeholderName"
        value={this.props.stakeholderName}
        options={this.props.stakeholderOptions}
        onChange={this.props.onFieldChange}
        onValidation={this.props.onValidation}
        rules={[ruleTypes.FIELD_REQUIRED]}
        showErrors={this.props.submitAttempted}
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
          {this.props.transactionType === transactionTypes.BUY
            ? this.buyStakeholderSelect()
            : this.sellStakeholderSelect()}
        </FormSection>

        <FormSection className="formsection" title="Plastic Type *">
          <SearchSelect
            field="plasticType"
            value={this.props.plasticType}
            options={staticPlasticTypes}
            onChange={this.props.onFieldChange}
            onValidation={this.props.onValidation}
            rules={[ruleTypes.FIELD_REQUIRED]}
            showErrors={this.props.submitAttempted}
          />
        </FormSection>
        <FormSection className="formsection" title="Amount *">
          <TextInput
            id="unitPrice"
            className="amount-input half-width inline margin-right-20"
            field="unitPrice"
            rightlabel=" ₹/Kg"
            value={this.props.unitPrice}
            placeholder={'0.00'}
            type="number"
            onChange={this.props.onFieldChange}
            onValidation={this.props.onValidation}
            rules={[ruleTypes.FIELD_REQUIRED]}
            showErrors={this.props.submitAttempted}
          />
          <TextInput
            id="weight"
            className="amount-input half-width inline"
            field="weight"
            rightlabel=" Kg"
            type="number"
            value={this.props.weight}
            placeholder={'0'}
            onChange={this.props.onFieldChange}
            onValidation={this.props.onValidation}
            rules={[ruleTypes.FIELD_REQUIRED]}
            showErrors={this.props.submitAttempted}
          />
        </FormSection>
        <FormSection className="formsection" title="Date">
          <DayPickerInput
            className="date-input-field"
            placeholder="YYYY-MM-DD"
            onDayChange={day => this.props.handleDayChange('transactionDate', day)}
          />
        </FormSection>
        <OnSubmitButton nextPath="/ps/transaction-history" onClick={this.props.onSubmit} />
      </div>
    );
  }
}

const staticPlasticTypes = [{ label: 'Green PET', value: 'green_pet' }];

PrimarySegregatorTransaction.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  stakeholderOptions: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleNewStakeholder: PropTypes.func,
  showModal: PropTypes.bool,
  hideModal: PropTypes.func,
  transactionType: PropTypes.number.isRequired,
  submitAttempted: PropTypes.bool.isRequired,
  onValidation: PropTypes.func,
  // field values
  unitPrice: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  plasticType: PropTypes.object,
  stakeholderName: PropTypes.object.isRequired,
};

export default PrimarySegregatorTransaction;

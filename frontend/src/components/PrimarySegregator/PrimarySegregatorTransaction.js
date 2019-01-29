import React from 'react';
import PropTypes from 'prop-types';
import FormSection from '../input-components/FormSection';
import SearchSelect from '../input-components/SearchSelect';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TextInput from '../input-components/TextInput';
import CreateStakeholderModal from './CreateStakeholderModal';
import OnSubmitButton from '../common/OnSubmitButton';
import { transactionTypes } from './HOCPrimarySegregatorTransaction';
import { ruleTypes } from '../utils/form';
import 'react-day-picker/lib/style.css';
import './../FormPage.css';

const PrimarySegregatorTransaction = props => {
  const pageTitle = props.transactionType === transactionTypes.BUY ? 'From *' : 'To *';
  return (
    <div className="page-wrapper" id="transactions-wrapper">
      <h1>{props.title}</h1>
      <p className="required-field-notif">
        All fields marked with <b>*</b> are required.
      </p>

      {props.transactionType === transactionTypes.BUY && (
        <CreateStakeholderModal show={props.showModal} handleClose={props.hideModal} />
      )}

      <FormSection title={pageTitle}>
        <SearchSelect
          createable={props.transactionType === transactionTypes.BUY}
          hasImage={props.transactionType === transactionTypes.BUY}
          field="stakeholderName"
          value={props.stakeholderName}
          options={props.stakeholderOptions}
          onChange={props.onFieldChange}
          onNewOptionClick={props.handleNewStakeholder}
          promptTextCreator={search => `${search} not found, create a new stakeholder`}
          onValidation={props.onValidation}
          rules={[ruleTypes.FIELD_REQUIRED]}
          showErrors={props.submitAttempted}
        />
      </FormSection>

      <FormSection className="formsection" title="Plastic Type *">
        <SearchSelect
          field="plasticType"
          value={props.plasticType}
          options={staticPlasticTypes}
          onChange={props.onFieldChange}
          onValidation={props.onValidation}
          rules={[ruleTypes.FIELD_REQUIRED]}
          showErrors={props.submitAttempted}
        />
      </FormSection>

      <FormSection className="formsection" title="Amount *">
        <TextInput
          id="unitPrice"
          className="amount-input half-width inline margin-right-20"
          field="unitPrice"
          rightlabel=" ₹/Kg"
          value={props.unitPrice}
          placeholder={'0.00'}
          type="number"
          onChange={props.onFieldChange}
          onValidation={props.onValidation}
          rules={[ruleTypes.FIELD_REQUIRED]}
          showErrors={props.submitAttempted}
        />
        <TextInput
          id="weight"
          className="amount-input half-width inline"
          field="weight"
          rightlabel=" Kg"
          type="number"
          value={props.weight}
          placeholder={'0'}
          onChange={props.onFieldChange}
          onValidation={props.onValidation}
          rules={[ruleTypes.FIELD_REQUIRED]}
          showErrors={props.submitAttempted}
        />
      </FormSection>

      <FormSection className="formsection" title="Date">
        <DayPickerInput
          className="date-input-field"
          placeholder="YYYY-MM-DD"
          onDayChange={day => props.handleDayChange('transactionDate', day)}
        />
      </FormSection>
      <OnSubmitButton nextPath="/ps/transaction-history" onClick={props.onSubmit} />
    </div>
  );
};

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

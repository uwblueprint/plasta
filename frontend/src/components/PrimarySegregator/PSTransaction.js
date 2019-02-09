import React from 'react';
import PropTypes from 'prop-types';
import FormSection from '../input-components/FormSection';
import SearchSelect from '../input-components/SearchSelect';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TextInput from '../input-components/TextInput';
import CreateStakeholderModal from './CreateStakeholderModal';
import OnSubmitButton from '../common/OnSubmitButton';
import { transactionTypes } from './PSTransactionContainer';
import { ruleTypes } from '../utils/form';
import { plasticOptions } from '../utils/plastic';
import 'react-day-picker/lib/style.css';
import './../FormPage.css';
import './PrimarySegregator.css';

function orderValueAtTop(options, value) {
  return options.sort((a, b) => {
    if (a.value === value) return -1;
    if (b.value === value) return 1;
    if (a.label > b.label) return 1;
    return -1;
  });
}

const PSTransaction = props => {
  const pageTitle = props.transactionType === transactionTypes.BUY ? 'From *' : 'To *';
  const createStakeholderOption = [
    {
      label: 'Create a new stakeholder',
      value: 'create-new',
    },
  ];
  const allStakeholderOptions =
    props.transactionType === transactionTypes.BUY
      ? orderValueAtTop(
          props.stakeholderOptions.concat(createStakeholderOption),
          createStakeholderOption[0].value
        )
      : props.stakeholderOptions;
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
          options={allStakeholderOptions}
          onChange={props.onFieldChange}
          onValidation={props.onValidation}
          rules={[ruleTypes.FIELD_REQUIRED]}
          showErrors={props.submitAttempted}
          searchable={false}
        />
      </FormSection>

      <FormSection className="formsection" title="Plastic Type *">
        <SearchSelect
          field="plasticType"
          value={props.plasticType}
          hasImage
          options={plasticOptions}
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
          onDayChange={day => props.handleDayChange}
        />
      </FormSection>
      <OnSubmitButton nextPath="/ps/transaction-history" onClick={props.onSubmit} />
    </div>
  );
};

PSTransaction.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  stakeholderOptions: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleNewStakeholder: PropTypes.func,
  showModal: PropTypes.bool,
  hideModal: PropTypes.func,
  transactionType: PropTypes.string.isRequired,
  submitAttempted: PropTypes.bool.isRequired,
  onValidation: PropTypes.func,
  // field values
  unitPrice: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  plasticType: PropTypes.object,
  stakeholderName: PropTypes.object.isRequired,
};

export default PSTransaction;

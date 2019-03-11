import React from 'react';
import PropTypes from 'prop-types';
import FormSection from '../input-components/FormSection';
import SearchSelect from '../input-components/SearchSelect';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TextInput from '../input-components/TextInput';
import IconTextInput from '../input-components/IconTextInput';
import CreateStakeholderModal from './CreateStakeholderModal';
import CancelButton from '../common/CancelButton.js';
import OnSubmitButton from '../common/OnSubmitButton';
import { TRANSACTION_TYPES } from '../utils/transactions';
import { RULE_TYPES } from '../utils/form';
import { getPlasticTypesByTransactionType } from '../utils/plastic';
import 'react-day-picker/lib/style.css';
import './../FormPage.css';
import './PrimarySegregator.css';
import FileInput from '../input-components/FileInput';
import Rupee from '../../assets/Rupee';
import Weight from '../../assets/Weight';

function orderValueAtTop(options, value) {
  return options.sort((a, b) => {
    if (a.value === value) return -1;
    if (b.value === value) return 1;
    if (a.label > b.label) return 1;
    return -1;
  });
}

const CreatePSTransaction = props => {
  const pageTitle = props.transactionType === TRANSACTION_TYPES.BUY ? 'From *' : 'To *';
  const createStakeholderOption = [
    {
      label: 'Create a new stakeholder',
      value: 'create-new',
    },
  ];
  const allStakeholderOptions =
    props.transactionType === TRANSACTION_TYPES.BUY
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

      {props.transactionType === TRANSACTION_TYPES.BUY && (
        <CreateStakeholderModal show={props.showModal} handleClose={props.hideModal} />
      )}

      <FormSection title={pageTitle}>
        <SearchSelect
          createable={props.transactionType === TRANSACTION_TYPES.BUY}
          hasImage={props.transactionType === TRANSACTION_TYPES.BUY}
          field="stakeholderName"
          value={props.stakeholderName}
          options={allStakeholderOptions}
          onChange={props.onFieldChange}
          onValidation={props.onValidation}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          showErrors={props.submitAttempted}
          searchable={false}
        />
      </FormSection>

      <FormSection className="formsection" title="Plastic Type *">
        <SearchSelect
          field="plasticType"
          value={props.plasticType}
          hasImage
          options={getPlasticTypesByTransactionType(props.transactionType)}
          onChange={props.onFieldChange}
          onValidation={props.onValidation}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          showErrors={props.submitAttempted}
        />
      </FormSection>

      <FormSection className="formsection" title="Amount *">
        <IconTextInput
          id="unitPrice"
          label="Amount(₹)"
          variant="outlined"
          field="unitPrice"
          type="number"
          value={props.unitPrice}
          iconimage={Rupee}
          onChange={props.onFieldChange}
          onValidation={props.onValidation}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          showErrors={props.submitAttempted}
        />
      </FormSection>

      <FormSection className="formsection" title="Weight *">
        <IconTextInput
          id="weight"
          label="Amount(Kg)"
          variant="outlined"
          field="weight"
          type="number"
          value={props.weight}
          iconimage={Weight}
          onChange={props.onFieldChange}
          onValidation={props.onValidation}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
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

      <FormSection className="formsection" title="">
        <FileInput
          className="large-input full-width"
          field="receiptPicture"
          value={props.receiptPicture}
          onChange={props.onFieldChange}
        />
      </FormSection>

      <div style={{ textAlign: 'center' }}>
        <CancelButton />
        <OnSubmitButton nextPath="/ps/transaction-history" onClick={props.onSubmit} />
      </div>
    </div>
  );
};

CreatePSTransaction.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  stakeholderOptions: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
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
  receiptPicture: PropTypes.any.isRequired,
};

export default CreatePSTransaction;

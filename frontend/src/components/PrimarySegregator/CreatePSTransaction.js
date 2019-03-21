import React from 'react';
import PropTypes from 'prop-types';
import SearchSelect from '../input-components/SearchSelect';
import IconTextInput from '../input-components/IconTextInput';
import IconDateInput from '../input-components/IconDateInput';
import CancelButton from '../common/CancelButton.js';
import OnSubmitButton from '../common/OnSubmitButton';
import { TRANSACTION_TYPES } from '../utils/transactions';
import { RULE_TYPES } from '../utils/form';
import { getPlasticTypesByTransactionType } from '../utils/plastic';
import 'react-day-picker/lib/style.css';
import './../FormPage.css';
import './PrimarySegregator.css';
import FileInput from '../input-components/FileInput';
import * as Icons from '../../assets/icons';

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
      <p className="required-field-notif">
        All fields marked with <b>*</b> are required.
      </p>

      <SearchSelect
        label={pageTitle}
        iconimage={Icons.peoplePlaceholder}
        createable={props.transactionType === TRANSACTION_TYPES.BUY}
        field="stakeholderName"
        value={props.stakeholderName}
        options={allStakeholderOptions}
        onChange={props.onFieldChange}
        onValidation={props.onValidation}
        rules={[RULE_TYPES.FIELD_REQUIRED]}
        showErrors={props.submitAttempted}
        isSearchable={false}
      />

      <SearchSelect
        label="Plastic Type"
        field="plasticType"
        iconimage={Icons.plasticType}
        value={props.plasticType}
        options={getPlasticTypesByTransactionType(props.transactionType)}
        onChange={props.onFieldChange}
        onValidation={props.onValidation}
        rules={[RULE_TYPES.FIELD_REQUIRED]}
        showErrors={props.submitAttempted}
      />

      <IconTextInput
        id="unitPrice"
        label="Amount(₹)"
        field="unitPrice"
        type="number"
        value={props.unitPrice}
        iconimage={Icons.rupee}
        onChange={props.onFieldChange}
        onValidation={props.onValidation}
        rules={[RULE_TYPES.FIELD_REQUIRED]}
        showErrors={props.submitAttempted}
      />

      <IconTextInput
        id="weight"
        label="Amount(Kg)"
        field="weight"
        type="number"
        value={props.weight}
        iconimage={Icons.weight}
        onChange={props.onFieldChange}
        onValidation={props.onValidation}
        rules={[RULE_TYPES.FIELD_REQUIRED]}
        showErrors={props.submitAttempted}
      />

      <IconDateInput
        label="Date"
        iconimage={Icons.calendar}
        value={props.transactionDate}
        onChange={props.handleDayChange}
      />

      <FileInput
        className="large-input full-width"
        field="receiptPicture"
        value={props.receiptPicture}
        onChange={props.onFieldChange}
      />

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
  transactionType: PropTypes.string.isRequired,
  submitAttempted: PropTypes.bool.isRequired,
  onValidation: PropTypes.func,
  // field values
  unitPrice: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  plasticType: PropTypes.object,
  stakeholderName: PropTypes.object,
  receiptPicture: PropTypes.any.isRequired,
  transactionDate: PropTypes.string,
};

export default CreatePSTransaction;

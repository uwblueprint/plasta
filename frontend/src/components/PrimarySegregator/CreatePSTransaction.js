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
  let pageTitle = props.transactionType === TRANSACTION_TYPES.BUY ? 'From *' : 'To *';
  let plasticTypeLabel = 'Plastic Type *';
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

  const plasticTypes = getPlasticTypesByTransactionType(props.transactionType);

  let selectedStakeholder = props.stakeholderName;
  let selectedPlasticType = props.plasticType;
  let unitPrice = props.unitPrice;
  let weight = props.weight;
  let transactionDate = props.transactionDate;

  if (props.transaction) {
    selectedStakeholder = props.stakeholderName
      ? props.stakeholderName
      : allStakeholderOptions.filter(obj => {
          return props.transactionType == 'buy'
            ? obj.value === props.transaction.from_vendor_id
            : obj.value === props.transaction.to_vendor_id;
        });
    let dbPlasticType = props.transaction.plastics.filter(ps => {
      return ps.transaction_id === props.transaction.id;
    });
    selectedPlasticType = props.plasticType
      ? props.plasticType
      : plasticTypes.filter(ps => {
          return ps.value === dbPlasticType[0]['plastic_type'];
        });
    unitPrice = props.unitPrice
      ? props.unitPrice
      : dbPlasticType[0]['price'] / dbPlasticType[0]['quantity'];

    weight = props.weight ? props.weight : dbPlasticType[0]['quantity'];
    pageTitle = selectedStakeholder ? '' : pageTitle;
    plasticTypeLabel = selectedPlasticType ? '' : plasticTypeLabel;
    transactionDate =
      props.transaction.sale_date && props.transactionDateForEdit
        ? props.transactionDateForEdit
        : props.transaction.sale_date;
  }

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
        value={selectedStakeholder}
        options={allStakeholderOptions}
        onChange={props.onFieldChange}
        onValidation={props.onValidation}
        rules={[RULE_TYPES.FIELD_REQUIRED]}
        showErrors={props.submitAttempted}
        isSearchable={false}
      />

      <SearchSelect
        label={plasticTypeLabel}
        field="plasticType"
        iconimage={Icons.plasticType}
        value={selectedPlasticType}
        options={plasticTypes}
        onChange={props.onFieldChange}
        onValidation={props.onValidation}
        rules={[RULE_TYPES.FIELD_REQUIRED]}
        showErrors={props.submitAttempted}
      />

      <IconTextInput
        id="unitPrice"
        label="Amount(₹) *"
        field="unitPrice"
        type="number"
        value={unitPrice}
        iconimage={Icons.rupee}
        onChange={props.onFieldChange}
        onValidation={props.onValidation}
        rules={[RULE_TYPES.FIELD_REQUIRED]}
        showErrors={props.submitAttempted}
      />

      <IconTextInput
        id="weight"
        label="Amount(Kg) *"
        field="weight"
        type="number"
        value={weight}
        iconimage={Icons.weight}
        onChange={props.onFieldChange}
        onValidation={props.onValidation}
        rules={[RULE_TYPES.FIELD_REQUIRED]}
        showErrors={props.submitAttempted}
      />

      <IconDateInput
        label="Date"
        iconimage={Icons.calendar}
        value={transactionDate}
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

import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import SearchSelect from '../input-components/SearchSelect';
import RadioSelect from '../input-components/RadioSelect';
import FormSection from '../input-components/FormSection';
import TextInput from '../input-components/TextInput';
import { ruleTypes, onFieldChange, isFormValid, onValidation } from '../utils/form';
import OnSubmitButton from '../common/OnSubmitButton';
import FileInput from '../input-components/FileInput';
import CancelButton from '../common/CancelButton.js';
import { postMultiType } from '../utils/requests';
import { snakeCase } from 'lodash';
import '../FormPage.css';

// TODO (XIN): get from endpoints

const availableLanguages = [
  { label: 'English', value: 'english' },
  { label: 'Hindi', value: 'hindi' },
  { label: 'Urdu', value: 'urdu' },
  { label: 'Bengali', value: 'bengali' },
  { label: 'Tamil', value: 'tamil' },
];

const wastepickerTypes = [
  { label: 'Waste Picker (general)', value: 'wastepicker' },
  { label: 'Home Based Worker', value: 'home_based_worker' },
  { label: 'Itinerant Buyer', value: 'itinerant_buyer' },
  { label: 'Waste Picker Community Leader', value: 'wp_community_leader' },
];

const fieldsInfo = {
  name: { label: 'Name', default: '', isRequired: true },
  phoneNumber: { label: 'Phone', default: '', isRequired: true, type: 'metaData' },
  phoneType: { label: 'Type of Phone', default: '', isRequired: false, type: 'metaData' },
  vendorSubtype: { label: 'Wastepicker Type', default: 'wastepicker', isRequired: true },
  picture: { label: 'Wastepicker Picture', default: '', isRequired: false },
  address: { label: 'Address', default: '', isRequired: false, type: 'metaData' },
  language: { label: 'Spoken Language', default: 'hindi', isRequired: false, type: 'metaData' },
  aadhaarID: { label: 'Aadhaar ID', default: '', isRequired: false, type: 'metaData' },
  hdMemberID: { label: 'HD Member ID', default: '', isRequired: false, type: 'metaData' },
};

class CreateWastePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitAttempted: false,
    };
    Object.keys(fieldsInfo).forEach(field => (this.state[field] = fieldsInfo[field].default));
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = isFormValid.bind(this);
    this.onValidation = onValidation.bind(this);
  }

  async onSubmit() {
    if (!this.state.submitAttempted) this.setState({ submitAttempted: true }); // move out once onsubmit dispatched through redux
    if (!this.isFormValid()) {
      return Promise.reject('Please resolve all errors before submitting.');
    }
    const metaData = {};
    const data = [];
    Object.keys(fieldsInfo).forEach(field => {
      if (!this.state[field]) return;
      if (fieldsInfo[field].type === 'metaData') metaData[snakeCase(field)] = this.state[field];
      else {
        data.push({
          key: snakeCase(field),
          value: this.state[field],
        });
      }
    });
    // data.push({ key: 'meta_data', value: metaData });
    return postMultiType('/vendors', data, this.props.cookies);
  }

  render() {
    const submitAttempted = this.state.submitAttempted;
    return (
      <div className="page-wrapper" id="create-wastepicker-wrapper">
        <CancelButton context={this.context} />
        <h1>Create Waste Picker</h1>
        <p className="required-field-notif">
          All fields marked with <b>*</b> are required.
        </p>
        <FormSection>
          <h3 className="label">Name *</h3>
          <TextInput
            className="emphasis-input full-width"
            field="name"
            value={this.state.name}
            placeholder="Ramnath"
            onChange={this.onFieldChange}
            rules={[ruleTypes.FIELD_REQUIRED]}
            onValidation={this.onValidation}
            showErrors={submitAttempted}
          />

          <h3 className="label">Phone</h3>
          <TextInput
            className="large-input full-width"
            type="tel"
            field="phoneNumber"
            value={this.state.phoneNumber}
            placeholder="9988776655"
            onChange={this.onFieldChange}
            rules={[ruleTypes.FIELD_REQUIRED]}
          />

          <h3 className="label">Type of Phone</h3>
          <RadioSelect
            field="phoneType"
            value={this.state.phoneType}
            options={[
              { label: 'Basic Phone', value: 'basic' },
              { label: 'Smart Phone', value: 'smart' },
            ]}
            onChange={this.onFieldChange}
          />

          <h3 className="label">Wastepicker Type</h3>
          <SearchSelect
            field="vendorSubtype"
            value={this.state.vendorSubtype}
            options={wastepickerTypes}
            onChange={this.onFieldChange}
            rules={[ruleTypes.FIELD_REQUIRED]}
          />

          <h3 className="label">Upload Picture</h3>
          <FileInput
            className="large-input full-width"
            field="picture"
            value={this.state.picture}
            onChange={this.onFieldChange}
          />

          <h3 className="label">Address</h3>
          <TextInput
            className="large-input full-width"
            field="address"
            value={this.state.address}
            onChange={this.onFieldChange}
          />

          <h3 className="label">Language</h3>
          <SearchSelect
            field="language"
            value={this.state.language}
            options={availableLanguages}
            onChange={this.onFieldChange}
          />

          <h3 className="label">Aadhaar ID</h3>
          <TextInput
            className="large-input full-width"
            field="aadhaarID"
            value={this.state.aadhaarID}
            onChange={this.onFieldChange}
            placeholder="1111 2222 3333"
          />

          <h3 className="label">HD Member ID</h3>
          <TextInput
            className="large-input full-width"
            field="hdMemberID"
            value={this.state.hdMemberID}
            onChange={this.onFieldChange}
          />
        </FormSection>
        {/* TODO (XIN): Add nextPath for on successful submit*/}
        <OnSubmitButton nextPath="/ps/transaction-history" onClick={this.onSubmit} />
      </div>
    );
  }
}

export default withCookies(CreateWastePicker);

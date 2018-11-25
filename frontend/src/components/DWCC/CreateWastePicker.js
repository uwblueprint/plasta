import React, { Component } from 'react';
import SearchSelect from '../input-components/SearchSelect';
import RadioSelect from '../input-components/RadioSelect';
import FormSection from '../input-components/FormSection';
import TextInput from '../input-components/TextInput';
import '../FormPage.css';
import { ruleTypes, onFieldChange, isFormValid, onValidation } from '../utils/form';
import CancelButton from '../common/CancelButton.js';

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
  wastepickerName: { label: 'Name', default: '', isRequired: true },
  phone: { label: 'Phone', default: '', isRequired: true },
  phoneType: { label: 'Type of Phone', default: '', isRequired: false },
  wastepickerType: { label: 'Wastepicker Type', default: '', isRequired: true },
  picture: { label: 'Wastepicker Picture', default: '', isRequired: false },
  address: { label: 'Address', default: '', isRequired: false },
  language: { label: 'Spoken Language', default: '', isRequired: false },
  aadhaarID: { label: 'Aadhaar ID', default: '', isRequired: false },
  hdMemberID: { label: 'HD Member ID', default: '', isRequired: false },
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

  onSubmit() {
    if (!this.state.submitAttempted) this.setState({ submitAttempted: true }); // move out once onsubmit dispatched through redux
    // TODO (xin) send data
    if (!this.isFormValid()) {
      alert('Please resolve all errors before submitting.');
    }
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
            field="wastepickerName"
            value={this.state.wastepickerName}
            placeholder="Ramnath"
            onChange={this.onFieldChange}
            rules={[ruleTypes.FIELD_REQUIRED]}
            onValidation={this.onValidation}
            showErrors={submitAttempted}
          />

          <h3 className="label">Phone *</h3>
          <TextInput
            className="large-input full-width"
            type="tel"
            field="phone"
            value={this.state.phone}
            placeholder="9988776655"
            onChange={this.onFieldChange}
            rules={[ruleTypes.FIELD_REQUIRED]}
            onValidation={this.onValidation}
            showErrors={submitAttempted}
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

          <h3 className="label">Wastepicker Type *</h3>
          <SearchSelect
            field="wastepickerType"
            value={this.state.wastepickerType}
            options={wastepickerTypes}
            onChange={this.onFieldChange}
            rules={[ruleTypes.FIELD_REQUIRED]}
            onValidation={this.onValidation}
            showErrors={submitAttempted}
          />

          <h3 className="label">Upload Picture</h3>
          <TextInput
            className="large-input full-width"
            type="file"
            field="picture"
            onChange={() => {}} // TODO (XIN)
            value={this.state.picture}
            // TODO (XIN): onChange
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
            field="adhaarID"
            value={this.state.adhaarID}
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

        <button className="bg-green btn-dark uppercase" type="submit" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default CreateWastePicker;

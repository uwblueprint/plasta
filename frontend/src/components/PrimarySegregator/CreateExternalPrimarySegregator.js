import React, { Component } from 'react';
import { snakeCase } from 'lodash';
import FormSection from '../input-components/FormSection';
import TextInput from '../input-components/TextInput';
import { ruleTypes, onFieldChange, isFormValid, onValidation } from '../utils/form';
import { post } from '../utils/requests';
import OnSubmitButton from '../common/OnSubmitButton';
import '../FormPage.css';

const fieldsInfo = {
  name: { label: 'Name', default: '' },
  phoneNumber: { label: 'Phone', default: '', type: 'metaData' },
  address: { label: 'Address', default: '', type: 'metaData' },
};

export default class CreateExternalPrimarySegregator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitAttempted: false,
    };
    Object.keys(fieldsInfo).forEach(field => (this.state[field] = fieldsInfo[field].default));
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
    const data = { vendor_type: 'dwcc', vendor_subtype: 'small_scrap_shop', meta_data: {} };
    Object.keys(fieldsInfo).forEach(field => {
      if (fieldsInfo[field].type === 'metaData')
        data.meta_data[snakeCase(field)] = this.state[field];
      else data[snakeCase(field)] = this.state[field];
    });
    post('/vendors', data);
  }

  render() {
    return (
      <div className="page-wrapper" id="create-wastepicker-wrapper">
        <h1>Create External Primary Segregator</h1>
        <FormSection title="Identification">
          <h3 className="label">Name *</h3>
          <TextInput
            className="emphasis-input full-width"
            field="name"
            value={this.state.name}
            placeholder="Your answer here..."
            onChange={this.onFieldChange}
            onValidation={this.onValidation}
            rules={[ruleTypes.FIELD_REQUIRED]}
            showErrors={this.state.submitAttempted}
          />

          <h3 className="label">Phone</h3>
          <TextInput
            className="large-input full-width"
            type="tel"
            field="phoneNumber"
            value={this.state.phoneNumber}
            placeholder="9988776655"
            onChange={this.onFieldChange}
          />

          <h3 className="label">Address</h3>
          <TextInput
            className="large-input full-width"
            field="address"
            value={this.state.address}
            onChange={this.onFieldChange}
          />
        </FormSection>
        {/* TODO (XIN): Add nextPath for on successful submit*/}
        <OnSubmitButton onClick={this.onSubmit} />
      </div>
    );
  }
}
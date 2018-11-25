import React, { Component } from 'react';
import { snakeCase } from 'lodash';
import FormSection from '../input-components/FormSection';
import TextInput from '../input-components/TextInput';
import { ruleTypes, onFieldChange, isFormValid, onValidation } from '../utils/form';
import '../FormPage.css';

const fieldsInfo = {
  name: { label: 'Name', default: '', isRequired: true },
  phone: { label: 'Phone', default: '', isRequired: false },
  address: { label: 'Address', default: '', sisRequired: false },
};

export default class CreateExternalDWCC extends Component {
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

  onSubmit() {
    if (!this.state.submitAttempted) this.setState({ submitAttempted: true }); // move out once onsubmit dispatched through redux
    if (!this.isFormValid()) {
      alert('Please resolve all errors before submitting.'); // TODO (XIN): modal error
      return;
    }
    // TODO : Change vendor_type to primary_segregator once identical backend rename done
  }

  render() {
    return (
      <div className="page-wrapper" id="create-wastepicker-wrapper">
        <h1>Create External DWCC</h1>
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
            field="phone"
            value={this.state.phone}
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

        <button className="bg-green btn-dark uppercase" type="submit" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

import React, { Component } from 'react';
import FormSection from '../input-components/FormSection';
import TextInput from '../input-components/TextInput';
import InvalidInputMessage from '../InvalidInputMessage';
import {
  errorTypes,
  onFieldChange,
  isFieldEmpty,
  onFieldBlur,
  isFormValid,
  getErrorMessage,
} from '../utils/form';
import '../FormPage.css';

const fieldsInfo = {
  dwccName: { label: 'Name', default: '', isRequired: true },
  phone: { label: 'Phone', default: '', isRequired: false },
  address: { label: 'Address', default: '', sisRequired: false },
};

export default class CreateExternalDWCC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.keys(fieldsInfo).forEach(field => (this.state[field] = fieldsInfo[field].default));
    this.onFieldChange = onFieldChange.bind(this);
    this.onFieldBlur = onFieldBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = isFormValid.bind(this);
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  onSubmit() {
    if (!this.isFormValid(fieldsInfo)) {
      alert('resolve errors'); // TODO (XIN): modal error
      return;
    }
    // TODO: send data
  }

  render() {
    return (
      <div className="page-wrapper" id="create-wastepicker-wrapper">
        <h1>Create External DWCC</h1>
        <FormSection title="Identification">
          <h3 className="label">Name *</h3>
          <TextInput
            className="emphasis-input full-width"
            field="dwccName"
            value={this.state.dwccName}
            placeholder="Your answer here..."
            onChange={this.onFieldChange}
            onBlur={this.onFieldBlur}
          />
          {this.state.dwccNameTouched &&
            isFieldEmpty(this.state.dwccName) && (
              <InvalidInputMessage
                showIcon
                message={getErrorMessage(errorTypes.FIELD_REQUIRED, fieldsInfo.dwccName.label)}
              />
            )}

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

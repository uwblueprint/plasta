import React, { Component } from 'react';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import './FormPage.css';

export default class CreateExternalDWCC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dwccName: '',
      telephone: '',
      address: '',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  onSubmit() {
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
            value={this.state.wastePickerName}
            placeholder="Your answer here..."
            onChange={this.onFieldChange}
          />

          <h3 className="label">Phone *</h3>
          <TextInput
            className="large-input full-width"
            type="tel"
            field="telephone"
            value={this.state.telephone}
            placeholder="123456789"
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

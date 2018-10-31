import React, { Component } from 'react';
import SearchSelect from './input-components/SearchSelect';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import './FormPage.css';

class CreateWastePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wastePickerName: '',
      telephone: '',
      phoneType: '',
      wastePickerType: '',
      picture: '',
      address: '',
      language: '',
      adhaarID: '',
      hdMemberID: '',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  onSubmit() {
    // const newWastePickerData = {};
    // TODO (xin) send data
  }

  render() {
    return (
      <div className="page-wrapper" id="create-wastepicker-wrapper">
        <h1>Create Waste Picker</h1>
        <FormSection>
          <h3 className="label">Name *</h3>
          <TextInput
            className="emphasis-input full-width"
            field="wastePickerName"
            value={this.state.wastePickerName}
            placeholder="Ramnath"
            onChange={this.onFieldChange}
          />

          <h3 className="label">Phone *</h3>
          <TextInput
            className="large-input full-width"
            type="tel"
            field="telephone"
            value={this.state.telephone}
            placeholder="9988776655"
            onChange={this.onFieldChange}
          />

          <h3 className="label">Type of Phone</h3>
          <SearchSelect
            field="phoneType"
            selectedOption={this.state.phoneType}
            options={[
              { label: 'Basic Phone', value: 'basic' },
              { label: 'Smart Phone', value: 'smart' },
            ]}
            onChange={this.onFieldChange}
          />

          <h3 className="label">Waste Picker Type *</h3>
          <SearchSelect
            field="wastePickerType"
            selectedOption={this.state.wastePickerType}
            options={[{ label: 'Wastepicker (general)', value: 'wastepickerGeneral' }]}
            // TODO (xin): Select from all subtype options
            onChange={this.onFieldChange}
          />

          <h3 className="label">Upload Picture</h3>
          <TextInput
            className="large-input full-width"
            type="file"
            field="picture"
            value={this.state.picture}
            // TODO: onChange
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
            selectedOption={this.state.language}
            options={[{ label: 'English', value: 'english' }]}
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

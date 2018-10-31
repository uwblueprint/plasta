import React, { Component } from 'react';
import FormSection from '../input-components/FormSection';
import SearchSelect from '../input-components/SearchSelect';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TextInput from '../input-components/TextInput';
import './../FormPage.css';

export default class DWCCTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  render() {
    return (
      <div className="page-wrapper" id={`transactions-wrapper`}>
        <h1>Sell</h1>
        <FormSection className="formsection" title="Stakeholder Name">
          <SearchSelect
            field="stakeholderName"
            selectedOption={this.state.brandName}
            options={staticWholesaler}
          />
          // onChange={this.onFieldChange}
        </FormSection>
        <FormSection className="formsection" title="Plastic Type">
          <SearchSelect
            field="plasticType"
            selectedOption={this.state.brandName}
            options={staticPlasticTypes}
          />
          // onChange={this.onFieldChange}
        </FormSection>
        <FormSection className="formsection" title="Amount">
          <TextInput
            id="price"
            className="half-width inline margin-right-20"
            field="price"
            rightlabel="₹"
          />
          // value={this.state.projectName}
          // placeholder="Enter project name here" // onChange={this.onFieldChange}
          // onBlur={this.validateRequiredField}
          <TextInput id="weight" className="half-width inline" field="weight" rightlabel="Kg" />
          // value={this.state.projectName}
          // placeholder="Enter project name here" // onChange={this.onFieldChange}
          // onBlur={this.validateRequiredField}
        </FormSection>
        <FormSection className="formsection" title="Date">
          <DayPickerInput className="date-input-field" placeholder="YYYY-MM-DD" />
          // onDayChange={day => this.handleDayChange('startDate', day)}
        </FormSection>
      </div>
    );
  }
}

const staticWholesaler = [
  { label: 'Wholesaler 1', value: 'WS1' },
  { label: 'Wholesaler 2', value: 'WS2' },
];

const staticPlasticTypes = [
  { label: 'PET', value: 'p' },
  { label: 'Pugga', value: 'WS2' },
  { label: 'HDP', value: 'WS2' },
  { label: 'Films', value: 'WS2' },
];

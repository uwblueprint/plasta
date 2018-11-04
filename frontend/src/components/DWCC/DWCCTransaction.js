import React, { Component } from 'react';
import FormSection from '../input-components/FormSection';
import SearchSelect from '../input-components/SearchSelect';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TextInput from '../input-components/TextInput';
import './../FormPage.css';
import PropTypes from 'prop-types';

export default class DWCCTransaction extends Component {
  render() {
    return (
      <div className="page-wrapper" id={`transactions-wrapper`}>
        <h1>Sell</h1>
        <FormSection className="formsection" title="Stakeholder Name">
          <SearchSelect
            field="stakeholderName"
            selectedOption={this.props.stakeholderName}
            options={this.props.stakeholderOptions}
            onChange={
              this.props.onFieldChange // TODO: Update names
            }
          />
        </FormSection>
        <FormSection className="formsection" title="Plastic Type">
          <SearchSelect
            field="plasticType"
            selectedOption={this.props.plasticType}
            options={staticPlasticTypes}
            onChange={this.props.onFieldChange}
          />
        </FormSection>
        <FormSection className="formsection" title="Amount">
          <TextInput
            id="price"
            className="half-width inline margin-right-20"
            field="price"
            rightlabel="₹"
            value={this.props.price}
            placeholder={'0.00'}
            onChange={this.props.onFieldChange}
          />
          <TextInput
            id="weight"
            className="half-width inline"
            field="weight"
            rightlabel="Kg"
            value={this.props.weight}
            onChange={this.props.onFieldChange}
          />
        </FormSection>
        <FormSection className="formsection" title="Date">
          <DayPickerInput
            className="date-input-field"
            placeholder="YYYY-MM-DD"
            onDayChange={day => this.props.handleDayChange('transactionDate', day)}
          />
        </FormSection>
        <button type="submit" onClick={this.props.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

const staticPlasticTypes = [
  { label: 'PET', value: 'p' },
  { label: 'Pugga', value: 'WS2' },
  { label: 'HDP', value: 'WS2' },
  { label: 'Films', value: 'WS2' },
];

// DWCCTransaction.propTypes {
//   brandName: PropTypes.string
// };

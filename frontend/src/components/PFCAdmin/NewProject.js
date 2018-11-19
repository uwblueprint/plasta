import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { snakeCase } from 'lodash';
import SearchSelect from '../input-components/SearchSelect';
import RadioSelect from '../input-components/RadioSelect';
import FormSection from '../input-components/FormSection';
import TextInput from '../input-components/TextInput';
import TextAreaInput from '../input-components/TextAreaInput';
import PlasticTypeQuantityGroup from '../input-components/PlasticTypeQuantityGroup';
import InvalidInputMessage from '../InvalidInputMessage';
import { post } from '../utils/requests';
import { fieldsInfo } from '../utils/project';
import {
  errorTypes,
  onFieldChange,
  isFieldEmpty,
  onFieldBlur,
  isFormValid,
  getErrorMessage,
} from '../utils/form';
import 'react-day-picker/lib/style.css';
import '../FormPage.css';

const staticDWCC = [{ label: 'DWCC 1', value: 'dw1' }, { label: 'DWCC 2', value: 'dw2' }];

const staticWholesaler = [
  { label: 'Wholesaler 1', value: 'WS1' },
  { label: 'Wholesaler 2', value: 'WS2' },
];

const staticShippingTerms = [
  { label: 'FOB', value: 'fob' },
  { label: 'CIF', value: 'cif' },
  { label: 'DDP', value: 'ddp' },
];

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.keys(fieldsInfo).map(field => {
      this.state[field] = fieldsInfo[field].default;
    });
    this.onFieldChange = onFieldChange.bind(this);
    this.onFieldBlur = onFieldBlur.bind(this);
    this.isFormValid = isFormValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(input, value) {
    this.setState({
      [input]: moment(value).format('YYYY-MM-DD'),
    });
  }

  onSubmit() {
    if (!this.isFormValid(fieldsInfo)) {
      // TODO: (xin) more elegant alerting
      alert('Please resolve errors');
      return;
    }
    const metaData = {
      cost_model: {},
    };

    Object.keys(fieldsInfo).forEach(field => {
      const snakeField = snakeCase(field);
      if (fieldsInfo[field].type === 'metaData') metaData[snakeField] = this.state[field];
      else if (fieldsInfo[field].type === 'costModel')
        metaData['cost_model'][snakeField] = this.state[field];
    });
    // TODO: (XIN) Handle proj creation error
    const newProjectData = {
      name: this.state.projectName,
      project_type: this.state.projectType,
      plastics: this.state.plastics,
      // meta_data: metaData,
    };
    post('/projects', newProjectData).catch(err => {});
  }

  render() {
    return (
      <div className="page-wrapper" id="new-proj-wrapper">
        <CancelButton context={this.context} />
        <h1>Create New Project</h1>
        <p className="required-field-notif">
          All fields marked with <b>*</b> are required.
        </p>
        <FormSection title="Project Name *">
          <TextInput
            className="emphasis-input full-width"
            field="projectName"
            value={this.state.projectName}
            placeholder="Enter project name here"
            onChange={this.onFieldChange}
            onBlur={this.onFieldBlur}
          />
          {this.state.projectNameTouched &&
            isFieldEmpty(this.state.projectName) && (
              <InvalidInputMessage
                showIcon
                message={getErrorMessage(errorTypes.FIELD_REQUIRED, fieldsInfo.projectName.label)}
              />
            )}
        </FormSection>

        <FormSection title="Project Description">
          <TextAreaInput
            field="description"
            className="full-width"
            value={this.state.description}
            placeholder="Enter description here"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Project Type">
          <RadioSelect
            field="projectType"
            selectedValue={this.state.projectType}
            options={[
              { label: 'External', value: 'external' },
              { label: 'Internal', value: 'internal' },
            ]}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Plastic Types *">
          <PlasticTypeQuantityGroup
            label="List of Plastic Types"
            field="plastics"
            onChange={this.onFieldChange}
            plasticQuantities={this.state.plastics}
          />
        </FormSection>

        <FormSection title="Brand Name">
          <TextInput
            field="brandName"
            className="full-width"
            value={this.state.brandName}
            placeholder="Enter brand name here"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Wholesalers *">
          <SearchSelect
            options={staticWholesaler}
            field="wholesalers"
            onChange={this.onFieldChange}
            selectedOption={this.state.wholesalers}
            onBlur={this.onFieldBlur}
            multi
          />
          {this.state.wholesalersTouched &&
            isFieldEmpty(this.state.wholesalers) && (
              <InvalidInputMessage
                showIcon
                message={getErrorMessage(errorTypes.FIELD_REQUIRED, fieldsInfo.wholesalers.label)}
              />
            )}
        </FormSection>

        <FormSection title="DWCC *">
          <SearchSelect
            options={staticDWCC}
            field="dwccSelected"
            onChange={this.onFieldChange}
            selectedOption={this.state.dwccSelected}
            multi
            onBlur={this.validateRequiredField}
          />
          {this.state.errors.dwccSelected && (
            <InvalidInputMessage showIcon message={this.state.errors.dwccSelected} />
          )}
        </FormSection>

        <FormSection title="Shipping Address">
          <TextInput
            field="shippingAddress"
            className="full-width"
            value={this.state.shippingAddress}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Shipping Terms">
          <SearchSelect
            field="shippingTerms"
            selectedOption={this.state.shippingTerms}
            options={staticShippingTerms}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="PO Number">
          <TextInput
            className="full-width"
            field="poNumber"
            value={this.state.poNumber}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection className="formsection" title="Start Date">
          <DayPickerInput
            className="date-input-field"
            placeholder="YYYY-MM-DD"
            onDayChange={day => this.handleDayChange('startDate', day)}
          />
        </FormSection>

        <FormSection className="formsection" title="End Date">
          <DayPickerInput
            className="date-input-field"
            placeholder="YYYY-MM-DD"
            onDayChange={day => this.handleDayChange('endDate', day)}
          />
        </FormSection>

        <FormSection title="Cost Model">
          <p className="priceHeader">Wastepicker Sell Price</p>
          <TextInput
            className="priceField"
            rightlabel="₹ / kg"
            type="number"
            field="wastepickerSellPrice"
            value={this.state.wastepickerSellPrice}
            placeholder="100.00"
            onChange={this.onFieldChange}
          />
          <p className="priceHeader">DWCC Sell Price</p>
          <TextInput
            className="priceField"
            rightlabel="₹ / kg"
            type="number"
            field="dwccSellPrice"
            value={this.state.dwccSellPrice}
            placeholder="100.00"
            onChange={this.onFieldChange}
          />
          <p className="priceHeader">Wholesaler Sell Price</p>
          <TextInput
            className="priceField"
            rightlabel="₹ / kg"
            type="number"
            field="wholesalerSellPrice"
            value={this.state.wholesalerSellPrice}
            placeholder="100.00"
            onChange={this.onFieldChange}
          />
          <p className="priceHeader">Price Buoyancy</p>
          <TextInput
            className="priceField"
            rightlabel="₹"
            type="number"
            field="priceBuoyancy"
            value={this.state.priceBuoyancy}
            placeholder="100.00"
            onChange={this.onFieldChange}
          />
          <p className="priceHeader">Shipping</p>
          <TextInput
            className="priceField"
            rightlabel="₹"
            type="number"
            field="shippingPrice"
            value={this.state.wholesalerShippingPrice}
            placeholder="100.00"
            onChange={this.onFieldChange}
          />
          <p className="priceHeader">Wholesaler Delivered</p>
          <TextInput
            className="priceField"
            rightlabel="₹"
            type="number"
            field="wholesalerDeliveredPrice"
            value={this.state.wholesalerDeliveredPrice}
            placeholder="100.00"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection className="formsection" title="Google Drive Link">
          <TextInput
            field="gDriveLink"
            className="full-width"
            value={this.state.gdriveLink}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <button className="btn-dark bg-green uppercase" type="submit" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default NewProject;

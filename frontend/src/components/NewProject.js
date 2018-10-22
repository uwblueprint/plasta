import React, { Component } from 'react';
import { List } from 'immutable';
import SearchSelect from './input-components/SearchSelect';
import RadioSelect from './input-components/RadioSelect';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import TextAreaInput from './input-components/TextAreaInput';
import PlasticTypeQuantityGroup from './input-components/PlasticTypeQuantityGroup';
import InvalidInputMessage from './InvalidInputMessage';
import { post } from './utils/requests';
import { fieldToLabelMap } from './utils/project';
import './NewProject.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

const staticDWCC = [{ label: 'DWCC 1', value: 'dw1' }, { label: 'DWCC 2', value: 'dw2' }];

const staticWholesaler = [
  { label: 'Wholesaler 1', value: 'WS1' },
  { label: 'Wholesaler 2', value: 'WS2' },
];

const staticBrands = [
  { label: 'Brand A', value: 'a' },
  { label: 'Brand B', value: 'b' },
  { label: 'Brand C', value: 'c' },
];

const staticShippingTerms = [
  { label: 'FOB', value: 'fob' },
  { label: 'CIF', value: 'cif' },
  { label: 'DDP', value: 'ddp' },
];

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        projectName: '',
        dwccSelected: '',
        wholesalerSelected: '',
      },
      projectName: '',
      brandName: '',
      description: '',
      gDriveLink: '',
      projectType: 'external',
      dwccSelected: [],
      wholesalerSelected: [],
      wholesalerSellPrice: '',
      wastepickerSellPrice: '',
      dwccSellPrice: '',
      shippingAddress: '',
      shippingTerms: '',
      poNumber: '',
      startDate: '',
      endDate: '',
      priceBuoyancy: '',
      shippingPrice: '',
      deliveredPrice: '',
      plasticQuantities: List(),
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateRequiredField = this.validateRequiredField.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  validateRequiredField(field) {
    const fieldObj = this.state[field.key];
    const isFilled = Array.isArray(fieldObj) ? fieldObj.length !== 0 : fieldObj;
    this.setState(currentState => {
      currentState.errors[field.key] = isFilled ? '' : `${fieldToLabelMap[field.key]} is required`;
      return currentState;
    });
  }

  validateAll() {
    Object.keys(this.state.errors).forEach(field => {
      this.validateRequiredField({ key: field });
    });
  }

  isFormValid() {
    this.validateAll();
    return Object.values(this.state.errors).reduce((prev, err) => {
      return prev && !err;
    }, true);
  }

  handleDayChange(input, value) {
    this.setState({
      [input]: moment(value).format('YYYY-MM-DD'),
    });
  }

  onSubmit() {
    if (!this.isFormValid()) {
      // TODO: (xin) more elegant alerting
      alert('Please resolve errors');
      return;
    }
    const metaData = {
      brand_name: this.state.brandName,
      description: this.state.description,
      gdrive_link: this.state.gDriveLink,
      project_type: this.state.projectType,
      dwcc_selected: this.state.dwccSelected,
      wholesaler_selected: this.state.wholesalerSelected,
      shipping_address: this.state.shippingAddress,
      shipping_terms: this.state.shippingTerms,
      po_number: this.state.poNumber,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      cost_model: {
        wholesaler_sell_price: this.state.wholesalerSellPrice,
        wastepicker_sell_price: this.state.wastepickerSellPrice,
        dwcc_sell_price: this.state.dwccSellPrice,
        price_buoyancy: this.state.priceBuoyancy,
        wholesaler_shipping_price: this.state.shippingPrice,
        // sell price + shipping_price = delivered_price
        wholesaler_delivered_price: this.state.deliveredPrice,
      },
    };
    const newProjectData = {
      name: this.state.projectName,
      project_type: this.state.projectType,
      plastics: this.state.plasticQuantities,
      // meta_data: metaData,
    };
    // TODO: (XIN) Handle proj creation error
    post('/projects', newProjectData).catch(err => {});
  }

  render() {
    return (
      <div className="page-wrapper" id="new-proj-wrapper">
        <h1>Create New Project</h1>
        <p className="required-field-notif">
          All fields marked with <b>*</b> are required.
        </p>
        <FormSection className="formsection" title="Project Name *">
          <TextInput
            width={10}
            id="proj-name-field"
            className="full-width"
            field="projectName"
            value={this.state.projectName}
            placeholder="Enter project name here"
            onChange={this.onFieldChange}
            onBlur={this.validateRequiredField}
          />
          {this.state.errors.projectName && (
            <InvalidInputMessage showIcon message={this.state.errors.projectName} />
          )}
        </FormSection>

        <FormSection className="formsection" title="Project Description">
          <TextAreaInput
            field="description"
            className="full-width"
            value={this.state.description}
            placeholder="Enter description here"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection className="formsection" title="Project Type">
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

        <FormSection className="formsection" title="Plastic Types">
          <PlasticTypeQuantityGroup
            label="List of Plastic Types"
            field="plasticQuantities"
            onChange={this.onFieldChange}
            plasticQuantities={this.state.plasticQuantities}
          />
        </FormSection>

        <FormSection className="formsection" title="Brand Name">
          <SearchSelect
            field="brandName"
            selectedOption={this.state.brandName}
            options={staticBrands}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection className="formsection" title="DWCC *">
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

        <FormSection className="formsection" title="Wholesaler *">
          <SearchSelect
            options={staticWholesaler}
            field="wholesalerSelected"
            onChange={this.onFieldChange}
            selectedOption={this.state.wholesalerSelected}
            onBlur={this.validateRequiredField}
            multi
          />
          {this.state.errors.wholesalerSelected && (
            <InvalidInputMessage showIcon message={this.state.errors.wholesalerSelected} />
          )}
        </FormSection>

        <FormSection className="formsection" title="Shipping Address">
          <TextInput
            field="shippingAddress"
            className="full-width"
            value={this.state.shippingAddress}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection className="formsection" title="Shipping Terms">
          <SearchSelect
            field="shippingTerms"
            selectedOption={this.state.shippingTerms}
            options={staticShippingTerms}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection className="formsection" title="PO Number">
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

        <FormSection className="formsection" title="Cost Model">
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
            value={this.state.shippingPrice}
            placeholder="100.00"
            onChange={this.onFieldChange}
          />
          <p className="priceHeader">Wholesaler Delivered</p>
          <TextInput
            className="priceField"
            rightlabel="₹"
            type="number"
            field="deliveredPrice"
            value={this.state.deliveredPrice}
            placeholder="100.00"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection className="formsection" title="Google Drive Link">
          <TextInput
            field="gDriveLink"
            className="full-width"
            value={this.state.gDriveLink}
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

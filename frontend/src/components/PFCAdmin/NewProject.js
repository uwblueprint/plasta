import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { snakeCase } from 'lodash';
import SearchSelect from '../input-components/SearchSelect';
import RadioSelect from '../input-components/RadioSelect';
import TextInput from '../input-components/TextInput';
import TextAreaInput from '../input-components/TextAreaInput';
import PlasticTypeQuantityGroup from '../input-components/PlasticTypeQuantityGroup';
import CancelButton from '../common/CancelButton';
import OnSubmitButton from '../common/OnSubmitButton';
import { post } from '../utils/requests';
import { fieldsInfo } from '../utils/project';
import { onFieldChange, RULE_TYPES, onValidation, isFormValid } from '../utils/form';
import 'react-day-picker/lib/style.css';
import '../FormPage.css';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { findVendorsByType } from '../utils/vendors.js';

const staticShippingTerms = [
  { label: 'FOB', value: 'fob' },
  { label: 'CIF', value: 'cif' },
  { label: 'DDP', value: 'ddp' },
];

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitAttempted: false,
      wholesalerOptions: [],
      primarySegregatorOptions: [],
    };

    Object.keys(fieldsInfo).forEach(field => {
      this.state[field] = fieldsInfo[field].default;
    });
    this.onFieldChange = onFieldChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.onValidation = onValidation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = isFormValid.bind(this);
  }

  static propType = {
    vendors: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const vendors = this.props.vendors;
    vendors.forEach(vendor => (vendor['label'] = vendor.name));
    const wholesalers = findVendorsByType(vendors, 'wholesaler');
    const primarySegregators = findVendorsByType(vendors, 'primary_segregator');
    this.setState({
      wholesalerOptions: wholesalers,
      primarySegregatorOptions: primarySegregators,
    });
  }

  handleDayChange(input, value) {
    this.setState({
      [input]: moment(value).format('YYYY-MM-DD'),
    });
  }

  async onSubmit() {
    if (!this.state.submitAttempted) this.setState({ submitAttempted: true });
    if (!this.isFormValid()) {
      return Promise.reject('Please fill in all required fields before submitting.');
    }

    const metaData = { cost_model: {} };
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
    return post('/projects', {
      data: newProjectData,
      authToken: this.props.cookies.get('access_token'),
    });
  }

  render() {
    const submitAttempted = this.state.submitAttempted;
    return (
      <div className="page-wrapper" id="new-proj-wrapper">
        <h1>Create New Project</h1>
        <p className="required-field-notif">
          All fields marked with <b>*</b> are required.
        </p>
        <TextInput
          className="emphasis-input full-width"
          field="projectName"
          value={this.state.projectName}
          placeholder="Enter project name here"
          onChange={this.onFieldChange}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          onValidation={this.onValidation}
          showErrors={submitAttempted}
        />
        <TextAreaInput
          field="description"
          className="full-width"
          value={this.state.description}
          placeholder="Enter description here"
          onChange={this.onFieldChange}
        />
        <RadioSelect
          field="projectType"
          value={this.state.projectType}
          options={[
            { label: 'External', value: 'external' },
            { label: 'Internal', value: 'internal' },
          ]}
          onChange={this.onFieldChange}
        />
        <PlasticTypeQuantityGroup
          label="List of Plastic Types"
          field="plastics"
          onChange={this.onFieldChange}
          plasticQuantities={this.state.plastics}
        />
        <TextInput
          field="brandName"
          className="full-width"
          value={this.state.brandName}
          placeholder="Enter brand name here"
          onChange={this.onFieldChange}
        />
        <SearchSelect
          options={this.state.wholesalerOptions}
          field="wholesalers"
          onChange={this.onFieldChange}
          value={this.state.wholesalers}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          onValidation={this.onValidation}
          showErrors={submitAttempted}
          isMulti
        />
        <SearchSelect
          options={this.state.primarySegregatorOptions}
          field="primarySegregators"
          onChange={this.onFieldChange}
          value={this.state.primarySegregators}
          isMulti
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          onValidation={this.onValidation}
          showErrors={submitAttempted}
        />
        <TextInput
          field="shippingAddress"
          className="full-width"
          value={this.state.shippingAddress}
          onChange={this.onFieldChange}
        />
        <SearchSelect
          field="shippingTerms"
          value={this.state.shippingTerms}
          options={staticShippingTerms}
          onChange={this.onFieldChange}
        />
        <TextInput
          className="full-width"
          field="poNumber"
          value={this.state.poNumber}
          onChange={this.onFieldChange}
        />
        <DayPickerInput
          className="date-input-field"
          placeholder="YYYY-MM-DD"
          onDayChange={day => this.handleDayChange('startDate', day)}
        />
        <DayPickerInput
          className="date-input-field"
          placeholder="YYYY-MM-DD"
          onDayChange={day => this.handleDayChange('endDate', day)}
        />
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
        <p className="priceHeader">Primary Segregator Sell Price</p>
        <TextInput
          className="priceField"
          rightlabel="₹ / kg"
          type="number"
          field="primarySegregatorSellPrice"
          value={this.state.primarySegregatorSellPrice}
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
          field="wholesalerShippingPrice"
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
        <TextInput
          field="gDriveLink"
          className="full-width"
          value={this.state.gdriveLink}
          onChange={this.onFieldChange}
        />
        <div style={{ textAlign: 'center' }}>
          <CancelButton />
          <OnSubmitButton nextPath="/projects" onClick={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vendors: state.vendors,
});

export default withCookies(connect(mapStateToProps)(NewProject));

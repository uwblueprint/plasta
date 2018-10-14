import React, { Component } from 'react';
import { List } from 'immutable';
import SearchSelect from './input-components/SearchSelect';
import RadioSelect from './input-components/RadioSelect';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import TextAreaInput from './input-components/TextAreaInput';
import PlasticTypeQuantityGroup from './input-components/PlasticTypeQuantityGroup';
import { post } from './utils/requests';
import './NewProject.css';

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
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  onSubmit() {
    const plasticTypes = this.state.plasticQuantities
      .map(pair => pair.get('plasticType'))
      .toArray();

    const metaData = {
      brand_name: this.state.brandName,
      description: this.state.description,
      gdrive_link: this.state.gDriveLink,
      project_type: this.state.projectType,
      project_status: this.state.projectStatus,
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
      plastics: plasticTypes,
      meta_data: metaData,
    };
    // TODO: (XIN) Handle proj creation error
    post('/projects', newProjectData).catch(err => {});
  }

  render() {
    return (
      <div className="page-wrapper" id="new-proj-wrapper">
        <h1>Create New Project</h1>
        <FormSection title="Project Name">
          <TextInput
            id="proj-name-field"
            className="full-width"
            field="projectName"
            value={this.state.projectName}
            placeholder="Your answer"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Project Description">
          <TextAreaInput
            field="description"
            value={this.state.description}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Google Drive Link">
          <TextInput
            field="gDriveLink"
            className="full-width"
            value={this.state.gDriveLink}
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

        <FormSection title="Plastic Types">
          <PlasticTypeQuantityGroup
            label="List of Plastic Types"
            field="plasticQuantities"
            onChange={this.onFieldChange}
            plasticQuantities={this.state.plasticQuantities}
          />
        </FormSection>

        <FormSection title="Brand Name">
          <SearchSelect
            field="brandName"
            selectedOption={this.state.brandName}
            options={staticBrands}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="DWCC">
          <SearchSelect
            options={staticDWCC}
            field="dwccSelected"
            onChange={this.onFieldChange}
            selectedOption={this.state.dwccSelected}
            multi
          />
        </FormSection>

        <FormSection title="Wholesaler">
          <SearchSelect
            options={staticWholesaler}
            field="wholesalerSelected"
            onChange={this.onFieldChange}
            selectedOption={this.state.wholesalerSelected}
            multi
          />
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

        <FormSection title="Start Date">
          <TextInput
            className="full-width"
            field="startDate"
            value={this.state.startDate}
            placeholder="YYYY/MM/DD"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="End Date">
          <TextInput
            className="full-width"
            field="endDate"
            value={this.state.endDate}
            placeholder="YYYY/MM/DD"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Cost Model">
          <TextInput
            leftlabel="Wholesaler Sell Price"
            rightlabel="₹/kg"
            type="number"
            field="wholesalerSellPrice"
            value={this.state.wholesalerSellPrice}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Wastepicker Sell Price"
            rightlabel="₹kg"
            type="number"
            field="wastepickerSellPrice"
            value={this.state.wastepickerSellPrice}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="DWCC Sell Price"
            rightlabel="₹/kg"
            type="number"
            field="dwccSellPrice"
            value={this.state.dwccSellPrice}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Price Buoyancy"
            rightlabel="₹"
            type="number"
            field="priceBuoyancy"
            value={this.state.priceBuoyancy}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Delivered"
            rightlabel="₹"
            type="number"
            field="deliveredPrice"
            value={this.state.deliveredPrice}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Shipped"
            rightlabel="₹"
            type="number"
            field="shippingPrice"
            value={this.state.shippingPrice}
            onChange={this.onFieldChange}
          />
        </FormSection>
        <button className="btn btn-green uppercase" type="submit" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default NewProject;

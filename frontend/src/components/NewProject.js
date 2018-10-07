import React, { Component } from 'react';
import { List } from 'immutable';
import SearchSelect from './input-components/SearchSelect';
import RadioSelect from './input-components/RadioSelect';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import TextAreaInput from './input-components/TextAreaInput';
import PlasticTypeQuantityGroup from './input-components/PlasticTypeQuantityGroup';
import './NewProject.css';

const staticDWCC = [{ label: 'DWCC 1', value: 'dw1' }, { label: 'DWCC 2', value: 'dw2' }];

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      brandName: '',
      description: '',
      gDriveLink: '',
      projectStatus: 'archive',
      projectType: 'external',
      dwccSelected: [],
      wholesalerSelected: [],
      wastepickerSell: '',
      wastepickerSellPrice: '',
      wholesalerSell: '',
      wholesalerPurchase: '',
      transactionFee: '',
      priceBuoyancy: '',
      wholesalerExworks: '',
      deliveredAmount: '',
      shippedAmount: '',
      plasticQuantities: List(),
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  onSubmit() {
    const url = process.env.REACT_APP_API_URL + 'project';
    const plasticTypes = this.state.plasticQuantities
      .map(pair => pair.get('plasticType'))
      .toArray();
    const newProjectData = {
      name: this.state.projectName,
      project_type: this.state.projectType,
      plastic_types: plasticTypes,
    };
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProjectData),
    };
    fetch(url, data);
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

        <FormSection title="Status">
          <RadioSelect
            field="projectStatus"
            selectedValue={this.state.projectStatus}
            options={[{ label: 'Archive', value: 'archive' }, { label: 'Active', value: 'active' }]}
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
            options={[
              { label: 'Brand A', value: 'a' },
              { label: 'Brand B', value: 'b' },
              { label: 'Brand C', value: 'c' },
            ]}
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

        <FormSection title="Wastepicker">
          <TextInput
            leftlabel="Sell"
            rightlabel="Rs/Kg"
            type="number"
            field="wastepickerSell"
            value={this.state.wastepickerSell}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Sell Price"
            rightlabel="₹"
            type="number"
            field="wastepickerSellPrice"
            value={this.state.wastepickerSellPrice}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Wholesaler">
          <TextInput
            leftlabel="Sell"
            rightlabel="Rs/Kg"
            type="number"
            field="wholesalerSell"
            value={this.state.wholesalerSell}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Purchase"
            type="number"
            rightlabel="Rs/Kg"
            field="wholesalerPurchase"
            value={this.state.wholesalerPurchase}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="PFC">
          <TextInput
            leftlabel="Transaction Fee"
            rightlabel="₹"
            type="number"
            field="transactionFee"
            value={this.state.transactionFee}
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Cost Model">
          <TextInput
            leftlabel="Price Buoyancy"
            rightlabel="₹"
            type="number"
            field="priceBuoyancy"
            value={this.state.priceBuoyancy}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Wholesaler Exworks"
            rightlabel="₹"
            type="number"
            field="wholesalerExworks"
            value={this.state.wholesalerExworks}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Delivered"
            rightlabel="₹"
            type="number"
            field="deliveredAmount"
            value={this.state.deliveredAmount}
            onChange={this.onFieldChange}
          />
          <TextInput
            leftlabel="Shipped"
            rightlabel="₹"
            type="number"
            field="shippedAmount"
            value={this.state.shippedAmount}
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

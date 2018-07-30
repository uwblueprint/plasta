import React, { Component } from 'react';
import SearchSelect from './input-components/SearchSelect';
import RadioSelect from './input-components/RadioSelect';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import TextAreaInput from './input-components/TextAreaInput';
import './NewProject.css';

const staticDWCC = [{ label: 'DWCC 1', value: 'dw1' }, { label: 'DWCC 2', value: 'dw2' }];

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'a',
      description: '',
      projectStatus: 'archive',
      projectType: 'external',
      dwccSelected: [],
      wastepickerSell: '',
      wastepickerSellPrice: '',
      wholesalerSell: '',
      wholesalerPurchase: '',
      transactionFee: '',
      priceBuoyancy: '',
      wholesalerExworks: '',
      deliveredAmount: '',
      shippedAmount: '',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  onSubmit() {
    // TODO: (nick) send the state of the form to wherever
  }

  render() {
    return (
      <div className="page-wrapper" id="new-proj-wrapper">
        <h1>New Project</h1>
        <FormSection title="Project Name">
          <RadioSelect
            selectedValue={this.state.name}
            options={[
              { label: 'Brand A', value: 'a' },
              { label: 'Brand B', value: 'b' },
              { label: 'Brand C', value: 'c' },
            ]}
            className="form-element"
            field="name"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Project Description">
          <TextAreaInput
            className="form-element"
            field="description"
            value={this.state.description}
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
            className="form-element"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="Status">
          <RadioSelect
            field="projectStatus"
            selectedValue={this.state.projectStatus}
            options={[{ label: 'Archive', value: 'archive' }, { label: 'Active', value: 'active' }]}
            className="form-element"
            onChange={this.onFieldChange}
          />
        </FormSection>

        <FormSection title="DWCC">
          <SearchSelect
            options={staticDWCC}
            onChange={selectedOption => this.setState({ dwccSelected: selectedOption })}
            selectedOption={this.state.dwccSelected}
            multi
            className="form-element"
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
      </div>
    );
  }
}

export default NewProject;

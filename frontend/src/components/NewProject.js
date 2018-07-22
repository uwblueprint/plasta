import React, { Component } from 'react';
import SearchSelect from './input-components/SearchSelect';
import RadioSelect from './input-components/RadioSelect';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import TextAreaInput from './input-components/TextAreaInput';
import './NewProject.css';
//import TextInputGroup from './input-components/TextInputGroup';

const staticDWCC = [{ label: 'DWCC 1', value: 'dw1' }, { label: 'DWCC 2', value: 'dw2' }];

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'a',
      projectStatus: 'archive',
      projectType: 'external',
      dwccList: [],
      dwccSelected: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, key) {
    this.setState({ [key]: value });
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
            onChange={this.onChange}
          />
        </FormSection>

        <FormSection title="Project Description">
          <TextAreaInput className="form-element" onChange={() => {}} />
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
            onChange={this.onChange}
          />
        </FormSection>

        <FormSection title="Status">
          <RadioSelect
            field="projectStatus"
            selectedValue={this.state.projectStatus}
            options={[{ label: 'Archive', value: 'archive' }, { label: 'Active', value: 'active' }]}
            className="form-element"
            onChange={this.onChange}
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
          <div>
            <TextInput leftlabel="Sell" rightlabel="Rs/Kg" onChange={() => {}} />
            <TextInput leftlabel="Sell Price" rightlabel="₹" onChange={() => {}} />
          </div>
        </FormSection>

        <FormSection title="Wholesaler">
          <div>
            <TextInput leftlabel="Sell" rightlabel="Rs/Kg" onChange={() => {}} />
            <TextInput leftlabel="Purchase" rightlabel="Rs/Kg" onChange={() => {}} />
          </div>
        </FormSection>

        <FormSection title="PFC">
          <TextInput leftlabel="Transaction Fee" rightlabel="₹" onChange={() => {}} />
        </FormSection>

        <FormSection title="Cost Model">
          <div>
            <TextInput leftlabel="Price Buoyancy" rightlabel="₹" onChange={() => {}} />
            <TextInput leftlabel="Wholesaler Exworks" rightlabel="₹" onChange={() => {}} />
            <TextInput leftlabel="Delivered" rightlabel="₹" onChange={() => {}} />
            <TextInput leftlabel="Shipped" rightlabel="₹" onChange={() => {}} />
          </div>
        </FormSection>
      </div>
    );
  }
}

export default NewProject;

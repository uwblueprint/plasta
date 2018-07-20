import React, { Component } from 'react';
import SearchSelect from './input-components/SearchSelect';
import RadioSelect from './input-components/RadioSelect';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import TextAreaInput from './input-components/TextAreaInput';
import TextInputGroup from './input-components/TextInputGroup';

const staticDWCC = [{ label: 'DWCC 1', value: 'dw1' }, { label: 'DWCC 2', value: 'dw2' }];

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = { dwccList: [], dwccSelected: [] };
  }

  onSubmit() {
    // TODO: (nick) send the state of the form to wherever
  }

  render() {
    return (
      <div className="page-wrapper new-proj-wrapper">
        <h1>New Project</h1>
        <FormSection title="Project Name">
          <RadioSelect
            options={[
              { label: 'Brand A', value: 'a' },
              { label: 'Brand B', value: 'b' },
              { label: 'Brand C', value: 'c' },
            ]}
            className="form-element"
          />
        </FormSection>

        <FormSection title="Project Description">
          <TextAreaInput label="Project Description" className="form-element" />
        </FormSection>

        <FormSection title="Project Type">
          <RadioSelect
            options={[{ label: 'External', value: 'ext' }, { label: 'Internal', value: 'int' }]}
            className="form-element"
          />
        </FormSection>

        <FormSection title="Status">
          <RadioSelect
            options={[{ label: 'Archive', value: 'archive' }, { label: 'Active', value: 'active' }]}
            className="form-element"
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
            <TextInput leftlabel="Sell" rightlabel="Rs/Kg" />
            <TextInput leftlabel="Sell Price" rightlabel="₹" />
          </div>
        </FormSection>

        <FormSection title="Wholesaler">
          <div>
            <TextInput leftlabel="Sell" rightlabel="Rs/Kg" />
            <TextInput leftlabel="Purchase" rightlabel="Rs/Kg" />
          </div>
        </FormSection>

        <FormSection title="PFC">
          <TextInput leftlabel="Transaction Fee" rightlabel="₹" />
        </FormSection>

        <FormSection title="Cost Model">
          <div>
            <TextInput leftlabel="Price Buoyancy" rightlabel="₹" />
            <TextInput leftlabel="Wholesaler Exworks" rightlabel="₹" />
            <TextInput leftlabel="Delivered" rightlabel="₹" />
            <TextInput leftlabel="Shipped" rightlabel="₹" />
          </div>
        </FormSection>
      </div>
    );
  }
}

export default NewProject;

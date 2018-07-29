import React, { Component } from 'react';
import { ProjectData } from './fakeData';
import FormSection from './input-components/FormSection';
import TextInput from './input-components/TextInput';
import SearchSelect from './input-components/SearchSelect';

class AdminNewStakeholder extends Component {
  constructor(props) {
    super(props);
    this.state = { projectList: [], selectedProjects: [] };
  }

  render() {
    return (
      <div className="page-wrapper">
        <h1>New Stakeholder</h1>
        <FormSection title="Organization">
          <div>
            <TextInput placeholder="Type name here" />
          </div>
        </FormSection>
        <FormSection title="Contact Information">
          <div>
            <TextInput leftlabel="First Name" placeholder="Type first name here" />
            <TextInput leftlabel="Last Name" placeholder="Type last name here" />
            <TextInput leftlabel="Phone" placeholder="10-digit number" />
            <TextInput leftlabel="Email" placeholder="johndoe@gmail.com" />
          </div>
        </FormSection>
        <FormSection title="Shipping Information">
          <div>
            <TextInput leftlabel="Office Address" placeholder="123 John Doe Road" />
            <TextInput leftlabel="Shipping Address" placeholder="10-digit number" />
          </div>
        </FormSection>
        <FormSection title="Project Selection">
          <SearchSelect
            options={ProjectData}
            onChange={selectedOption => this.setState({ projectSelected: selectedOption })}
            selectedOption={this.state.projectSelected}
            multi
            className="form-element"
          />
        </FormSection>
        <button
          className="btn"
          type="button"
          onClick={() => this.props.history.push('/admin/stakeholders')}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default AdminNewStakeholder;

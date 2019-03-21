import React, { Component } from 'react';
import { ProjectData } from '../fakeData';
import TextInput from '../input-components/TextInput';
import SearchSelect from '../input-components/SearchSelect';

class AdminNewStakeholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      officeAddress: '',
      shippingAddress: '',
      projectList: [],
      selectedProjects: [],
    };

    this.onChange = field => this.setState({ [field.key]: field.value });
  }

  render() {
    return (
      <div className="page-wrapper">
        <h1>New Stakeholder</h1>
        <TextInput
          placeholder="Type name here"
          field="organization"
          value={this.state.organization}
          onChange={this.onChange}
        />
        <TextInput
          leftlabel="First Name"
          placeholder="Type first name here"
          field="firstName"
          value={this.state.firstName}
          onChange={this.onChange}
        />
        <TextInput
          leftlabel="Last Name"
          placeholder="Type last name here"
          field="lastName"
          value={this.state.lastName}
          onChange={this.onChange}
        />
        <TextInput
          leftlabel="Phone"
          placeholder="10-digit number"
          type="number"
          field="phone"
          value={this.state.phone}
          onChange={this.onChange}
        />
        <TextInput
          leftlabel="Email"
          placeholder="johndoe@gmail.com"
          field="email"
          value={this.state.email}
          onChange={this.onChange}
        />
        <TextInput
          leftlabel="Office Address"
          placeholder="123 John Doe Road"
          field="officeAddress"
          value={this.state.officeAddress}
          onChange={this.onChange}
        />
        <TextInput
          leftlabel="Shipping Address"
          placeholder="10-digit number"
          field="shippingAddress"
          value={this.state.shippingAddress}
          onChange={this.onChange}
        />
        <SearchSelect
          options={ProjectData}
          onChange={selectedOption => this.setState({ projectSelected: selectedOption })}
          value={this.state.selectedProjects}
          multi
          className="form-element"
        />
        <button type="button" onClick={() => this.props.history.push('/admin/stakeholders')}>
          Submit
        </button>
      </div>
    );
  }
}

export default AdminNewStakeholder;

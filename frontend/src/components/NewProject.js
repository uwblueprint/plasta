import React, { Component } from 'react';
import SearchSelect from './input-components/SearchSelect';
import RadioSelect from './input-components/RadioSelect';

const staticDWCC = [{ label: 'DWCC 1', value: 'dw1' }, { label: 'DWCC 2', value: 'dw2' }];

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = { dwccList: [], dwccSelected: [] };
  }

  onSubmit() {
    // send the state of the form to wherever
  }

  render() {
    return (
      <div className="page-wrapper new-proj-wrapper">
        <h1> New Project uwu </h1>
        <SearchSelect
          title="DWCC"
          options={staticDWCC}
          onChange={selectedOption => this.setState({ dwccSelected: selectedOption })}
          selectedOption={this.state.dwccSelected}
          multi
        />
        <RadioSelect
          title="Project Name"
          options={[
            { label: 'Brand A', value: 'a' },
            { label: 'Brand B', value: 'b' },
            { label: 'Brand C', value: 'c' },
          ]}
        />
      </div>
    );
  }
}

export default NewProject;

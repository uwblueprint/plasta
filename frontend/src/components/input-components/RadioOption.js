import React, { Component } from 'react';
import { Radio } from 'react-form';

class RadioOption extends Component {
  render() {
    const label = this.props.label;
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <Radio value={this.props.value} id={this.props.key} />
      </div>
    );
  }
}

export default RadioOption;

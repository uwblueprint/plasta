import React, { Component } from 'react';
import { Radio } from 'react-form';
import PropTypes from 'prop-types';

class RadioOption extends Component {
  render() {
    const label = this.props.label;
    return (
      <div>
        <label htmlFor={this.props.value}>{label}</label>
        <Radio value={this.props.value} id={this.props.value} />
      </div>
    );
  }
}

RadioOption.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

export default RadioOption;

import React, { Component } from 'react';
import { Radio } from 'react-form';
import PropTypes from 'prop-types';
import './RadioOption.css';

class RadioOption extends Component {
  render() {
    const label = this.props.label;
    return (
      <div className="radio-option-wrapper">
        <Radio value={this.props.value} id={this.props.value} />
        <label htmlFor={this.props.value}>{label}</label>
      </div>
    );
  }
}

RadioOption.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

export default RadioOption;

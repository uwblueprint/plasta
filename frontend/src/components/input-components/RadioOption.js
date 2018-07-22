import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioOption.css';

class RadioOption extends Component {
  render() {
    const { checked, label, onChange } = this.props;
    const value = this.props.value;
    return (
      <div className="radio-option-wrapper">
        <label>
          <input
            type="radio"
            value={this.props.value}
            checked={checked}
            id={value}
            onChange={onChange}
          />
          <span className="radio-custom" />
          {label}
        </label>
      </div>
    );
  }
}

RadioOption.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioOption;

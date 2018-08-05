import React, { Component } from 'react';
import RadioOption from './RadioOption';
import './RadioSelect.css';
import PropTypes from 'prop-types';

class RadioSelect extends Component {
  constructor(props) {
    super(props);
    if (!props.selectedValue) this.state = { selectedValue: '' };
    this.onChange = selectedValue => {
      this.props.onChange({ value: selectedValue, key: this.props.field });
    };
  }

  render() {
    const { className, title, options } = this.props;
    const selectedValue = this.props.selectedValue || this.state.selectedValue;
    return (
      <div className={`radio-select ${className || ''}`}>
        {title && <h2> {title} </h2>}
        {options.map((option, i) => (
          <RadioOption
            key={option.value}
            checked={selectedValue === option.value}
            label={option.label}
            value={option.value}
            onChange={() => {
              this.onChange(option.value);
            }}
          />
        ))}
      </div>
    );
  }
}

RadioSelect.propTypes = {
  selectedValue: PropTypes.any.isRequired,
  field: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default RadioSelect;

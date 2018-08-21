import React, { Component } from 'react';
import classNames from 'classnames';
import RadioOption from './RadioOption';
import './RadioSelect.css';
import PropTypes from 'prop-types';

class RadioSelect extends Component {
  constructor(props) {
    super(props);
    this.onChange = selectedValue => {
      this.props.onChange({ value: selectedValue, key: this.props.field });
    };
  }

  render() {
    const { title, options, selectedValue } = this.props;
    return (
      <div className={classNames('radio-select', this.props.className)}>
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

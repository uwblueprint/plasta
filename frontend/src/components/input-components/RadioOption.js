import React from 'react';
import PropTypes from 'prop-types';
import './RadioOption.css';

const RadioOption = props => {
  const { checked, label, onChange, value } = props;
  return (
    <div className="radio-option-wrapper">
      <label>
        <input type="radio" value={value} checked={checked} id={value} onChange={onChange} />
        <span className="radio-custom" />
        {label}
      </label>
    </div>
  );
};

RadioOption.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioOption;

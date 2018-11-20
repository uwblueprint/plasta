import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InvalidInputMessage from '../InvalidInputMessage';
import composeInput from './InputContainer';
import './TextAreaInput.css';

const TextAreaInput = props => {
  const { className, label, value, onChange, errors, showErrors } = props;
  return (
    <div className={classNames('text-area-input', className)}>
      {label && <label>{label}</label>}
      <textarea onChange={onChange} value={value} />
      {showErrors && errors.map((err, i) => <InvalidInputMessage key={i} showIcon message={err} />)}
    </div>
  );
};

TextAreaInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default composeInput(TextAreaInput);

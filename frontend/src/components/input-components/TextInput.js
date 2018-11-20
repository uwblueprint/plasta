import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InvalidInputMessage from '../InvalidInputMessage';
import composeInput from './InputContainer';
import './TextInput.css';

const TextInput = props => {
  const { id, className, leftlabel, rightlabel, errors, showErrors, ...rest } = props;
  return (
    <div id={id} className={classNames('field-wrapper', className)}>
      {leftlabel && <span> {leftlabel} </span>}
      <input {...rest} className="text-input-field" />
      {rightlabel && <span> {rightlabel} </span>}
      {showErrors && errors.map((err, i) => <InvalidInputMessage key={i} showIcon message={err} />)}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  leftlabel: PropTypes.string,
  rightlabel: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  field: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default composeInput(TextInput);

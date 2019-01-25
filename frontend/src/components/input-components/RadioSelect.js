import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RadioOption from './RadioOption';
import InvalidInputMessage from '../InvalidInputMessage';
import composeInput from './InputContainer';
import './RadioSelect.css';

const RadioSelect = props => {
  const { className, title, options, value, errors, showErrors, ...rest } = props;
  return (
    <div className={classNames('radio-select', className)}>
      {title && <h2> {title} </h2>}
      {options.map((option, i) => (
        <RadioOption
          {...rest}
          key={option.value}
          checked={value === option.value}
          label={option.label}
          value={option.value}
          onChange={props.onChange}
        />
      ))}
      {showErrors && errors.map((err, i) => <InvalidInputMessage key={i} showIcon message={err} />)}
    </div>
  );
};

RadioSelect.propTypes = {
  value: PropTypes.any.isRequired,
  field: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default composeInput(RadioSelect);

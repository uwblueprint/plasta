import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import 'react-select/dist/react-select.css';
import InvalidInputMessage from '../InvalidInputMessage';
import composeInput from './InputContainer';
import './SearchSelect.css';

const SearchSelect = props => {
  const { className, label, errors, createable, showErrors, ...rest } = props;
  return (
    <div className={classNames('search-select-wrapper', className)}>
      {label && <label>{label}</label>}
      {createable ? <CreatableSelect {...rest} /> : <Select {...rest} />}
      {showErrors && errors.map((err, i) => <InvalidInputMessage key={i} showIcon message={err} />)}
    </div>
  );
};

SearchSelect.propTypes = {
  className: PropTypes.string,
  field: PropTypes.string,
  multi: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  createable: PropTypes.bool,
  onNewOptionClick: PropTypes.func,
  promptTextCreator: PropTypes.func,
};

SearchSelect.defaultProps = {
  createable: false,
};

export default composeInput(SearchSelect, {
  onChange: function onChange(selectedOption) {
    this.props.onChange && this.props.onChange({ value: selectedOption, key: this.props.field });
  },
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import 'react-select/dist/react-select.css';
import './SearchSelect.css';

class SearchSelect extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    this.props.onBlur && this.props.onBlur({ value: e.target.value, key: this.props.field });
  }

  onChange(selectedOption) {
    if (!this.props.onChange) return;
    this.props.onChange({ value: selectedOption, key: this.props.field });
  }

  render() {
    const { className, label, options, multi, selectedOption, ...rest } = this.props;
    return (
      <div className={classNames('search-select-wrapper', className)}>
        {label && <label>{label}</label>}
        <Select
          {...rest}
          value={selectedOption}
          onChange={this.onChange}
          onBlur={this.onBlur}
          options={options}
          multi={multi}
        />
      </div>
    );
  }
}

SearchSelect.propTypes = {
  className: PropTypes.string,
  field: PropTypes.string,
  multi: PropTypes.bool,
  options: PropTypes.array,
  selectedOption: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
    .isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default SearchSelect;

import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

class SearchSelect extends Component {
  constructor(props) {
    super(props);
    if (!props.selectedOption) this.state = { selectedOption: '' };
    this.onChange = this.onChange.bind(this);
  }

  onChange(selectedOption) {
    if (this.props.onChange) this.props.onChange(selectedOption);
    else this.setState({ selectedOption });
  }

  render() {
    const { options, multi } = this.props;
    const selectedOption = this.props.selectedOption || this.state.selectedOption;
    return (
      <div className={this.props.className + ' search-select-wrapper'}>
        <Select
          name="form-field-name"
          value={selectedOption}
          onChange={this.onChange}
          options={options}
          multi={multi}
        />
      </div>
    );
  }
}

SearchSelect.propTypes = {
  className: PropTypes.string,
  multi: PropTypes.bool,
  options: PropTypes.array,
  selectedOption: PropTypes.array,
  onChange: PropTypes.func,
  title: PropTypes.string,
};

export default SearchSelect;

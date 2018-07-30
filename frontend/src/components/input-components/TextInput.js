import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange && this.props.onChange({ value: e.target.value, key: this.props.field });
  }

  render() {
    const { className, placeholder, type, name, leftlabel, rightlabel, value } = this.props;
    return (
      <div className="field-wrapper">
        {leftlabel && <span> {leftlabel} </span>}
        <input
          className={`text-input-field ${className}`}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={this.onChange}
          value={value}
        />
        {rightlabel && <span> {rightlabel} </span>}
      </div>
    );
  }
}

TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  leftlabel: PropTypes.string,
  rightlabel: PropTypes.string,
  className: PropTypes.string,
  field: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TextInput;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange && this.props.onChange(e.target.value);
  }

  render() {
    const { className, placeholder, type, name, leftlabel, rightlabel } = this.props;
    return (
      <div className="field-wrapper">
        {leftlabel && <span> {leftlabel} </span>}
        <input
          className={`text-input-field ${className}`}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={this.onChange}
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
  onChange: PropTypes.func.isRequired,
};

export default TextInput;

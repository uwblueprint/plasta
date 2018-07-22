import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextAreaInput.css';

class TextAreaInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange && this.props.onChange(e.target.value);
  }

  render() {
    const { className, label } = this.props;
    return (
      <div className={`text-area-input ${className}`}>
        {label && <label>{label}</label>}
        <textarea onChange={this.onChange} />
      </div>
    );
  }
}

TextAreaInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaInput;

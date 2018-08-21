import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TextAreaInput.css';

class TextAreaInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange && this.props.onChange({ value: e.target.value, key: this.props.field });
  }

  render() {
    const { className, label } = this.props;
    return (
      <div className={classNames('text-area-input', className)}>
        {label && <label>{label}</label>}
        <textarea onChange={this.onChange} value={this.props.value} />
      </div>
    );
  }
}

TextAreaInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaInput;

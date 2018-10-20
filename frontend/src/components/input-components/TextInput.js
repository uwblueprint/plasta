import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    this.props.onBlur && this.props.onBlur({ value: e.target.value, key: this.props.field });
  }

  onChange(e) {
    this.props.onChange && this.props.onChange({ value: e.target.value, key: this.props.field });
  }

  render() {
    const { id, className, leftlabel, rightlabel, value, ...rest } = this.props;
    return (
      <div id={id} className={classNames('field-wrapper', className)}>
        {leftlabel && <span> {leftlabel} </span>}
        <input
          {...rest}
          className="text-input-field"
          onChange={this.onChange}
          onBlur={this.onBlur}
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
  id: PropTypes.string,
  field: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TextInput;

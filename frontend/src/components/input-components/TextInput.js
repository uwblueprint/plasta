import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import PropTypes from 'prop-types';
import './TextInput.css';

class TextInput extends Component {
  render() {
    return (
      <Form
        render={() => (
          <div className="field-wrapper">
            {this.props.leftlabel && <span> {this.props.leftlabel} </span>}
            <Text field="text" className="text-input-field" />
            {this.props.rightlabel && <span> {this.props.rightlabel} </span>}
          </div>
        )}
      />
    );
  }
}

TextInput.propTypes = {
  leftlabel: PropTypes.string,
  rightlabel: PropTypes.string,
  className: PropTypes.string,
};

export default TextInput;

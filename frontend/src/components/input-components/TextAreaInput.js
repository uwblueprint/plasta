import React, { Component } from 'react';
import { Form, TextArea } from 'react-form';
import PropTypes from 'prop-types';

class TextAreaInput extends Component {
  render() {
    const label = this.props.label.replace(' ', '-');
    return (
      <Form
        render={() => (
          <div className={this.props.className}>
            <TextArea field={label} id={label} />
          </div>
        )}
      />
    );
  }
}

TextAreaInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

export default TextAreaInput;

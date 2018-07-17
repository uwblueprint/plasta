import React, { Component } from 'react';
import { Form, RadioGroup } from 'react-form';
import RadioOption from './RadioOption';
import './RadioSelect.css';
import PropTypes from 'prop-types';

class RadioSelect extends Component {
  render() {
    return (
      <Form
        render={() => (
          <div className={this.props.className}>
            {this.props.title && <h2> {this.props.title} </h2>}
            <RadioGroup>
              {this.props.options.map(option => (
                <RadioOption key={option.value} label={option.label} value={option.value} />
              ))}
            </RadioGroup>
          </div>
        )}
      />
    );
  }
}

RadioSelect.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
};

export default RadioSelect;

import React, { Component } from 'react';
import { Form, RadioGroup } from 'react-form';
import RadioOption from './RadioOption';

class RadioSelect extends Component {
  render() {
    return (
      <Form
        render={() => (
          <div>
            {this.props.title && <h1> {this.props.title} </h1>}
            <RadioGroup field="">
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

export default RadioSelect;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import './TextInputGroup.css';

class TextInputGroup extends Component {
  constructor(props) {
    super(props);
    this.onAddInput = this.onAddInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(updatedText, idx) {
    const list = this.props.listOfValues;
    const updatedList = list.map((val, i) => {
      if (i === idx) return updatedText;
      return val;
    });
    this.onChange(updatedList);
  }

  onChange(updatedList) {
    this.props.onChange({ value: updatedList, key: this.props.field });
  }

  onRemoveInput(i) {
    const list = this.props.listOfValues;
    const updatedList = list.slice(0, i).concat(list.slice(i + 1));
    this.onChange(updatedList);
  }

  onAddInput() {
    const list = this.props.listOfValues;
    const updatedList = [...list, ''];
    this.onChange(updatedList);
  }

  render() {
    const { className, inputProps, label, listOfValues } = this.props;
    return (
      <div className={`text-input-group ${className || ''}`}>
        {label && <label className="title">{label}</label>}
        <button onClick={this.onAddInput} type="button" className="btn btn-group-input btn-green">
          Add
        </button>
        {listOfValues.map((val, i) => (
          <div key={`sibling-${i}`}>
            <TextInput
              type="text"
              value={val}
              onChange={e => this.onTextChange(e.value, i)}
              {...inputProps}
            />
            <button onClick={() => this.onRemoveInput(i)} type="button" className="btn btn-red">
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  }
}

TextInputGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  listOfValues: PropTypes.array.isRequired,
};

export default TextInputGroup;

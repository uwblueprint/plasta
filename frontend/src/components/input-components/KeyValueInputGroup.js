import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import SearchSelect from './SearchSelect';
import './InputGroup.css';

class KeyValueInputGroup extends Component {
  constructor(props) {
    super(props);
    this.onAddInput = this.onAddInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(updatedVal, field, idx) {
    const list = this.props.listOfPairs;
    const updatedList = list.map((pair, i) => {
      if (i === idx) {
        if (field === 0) return [updatedVal, pair[1]];
        return [pair[0], updatedVal];
      }
      return pair;
    });
    this.onChange(updatedList);
  }

  onChange(updatedList) {
    this.props.onChange({ value: updatedList, key: this.props.field });
  }

  onRemoveInput(i) {
    const list = this.props.listOfPairs;
    const updatedList = list.slice(0, i).concat(list.slice(i + 1));
    this.onChange(updatedList);
  }

  onAddInput() {
    const list = this.props.listOfPairs;
    const updatedList = [...list, ['', '']];
    this.onChange(updatedList);
  }

  render() {
    const { className, keyInputProps, valueInputProps, label, listOfPairs } = this.props;
    return (
      <div className={`input-group ${className || ''}`}>
        {label && <label className="title">{label}</label>}
        <button onClick={this.onAddInput} type="button" className="btn btn-group-input btn-green">
          Add
        </button>
        {listOfPairs.map((pair, i) => (
          <div key={`sibling-${i}`}>
            <SearchSelect
              label={keyInputProps.label}
              selectedOption={pair[0]}
              onChange={e => this.onTextChange(e.value, 0, i)}
              {...keyInputProps}
            />
            <TextInput
              type="text"
              value={pair[1]}
              onChange={e => this.onTextChange(e.value, 1, i)}
              {...valueInputProps}
            />
            <button onClick={() => this.onRemoveInput(i)} type="button" className="btn btn-red">
              delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

KeyValueInputGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  keyInputProps: PropTypes.object,
  valueInputProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  listOfPairs: PropTypes.array.isRequired,
};

export default KeyValueInputGroup;

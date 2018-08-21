import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import classNames from 'classnames';
import TextInput from './TextInput';
import SearchSelect from './SearchSelect';
import './InputGroup.css';

class PlasticTypeQuantityGroup extends Component {
  constructor(props) {
    super(props);
    this.onAddInput = this.onAddInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(updatedVal, field, idx) {
    const list = this.props.listOfPairs;
    const updatedList = list.update(idx, pair => {
      return pair.set(field, updatedVal);
    });
    this.onChange(updatedList);
  }

  onChange(updatedList) {
    this.props.onChange({ value: updatedList, key: this.props.field });
  }

  onRemoveInput(i) {
    const list = this.props.listOfPairs;
    const updatedList = list.delete(i);
    this.onChange(updatedList);
  }

  onAddInput() {
    const list = this.props.listOfPairs;
    const updatedList = list.push(Map([['plasticType', ''], ['quantity', '']]));
    this.onChange(updatedList);
  }

  render() {
    const { keyInputProps, valueInputProps, label, listOfPairs } = this.props;
    return (
      <div className={classNames('input-group', this.props.className)}>
        {label && <label className="title">{label}</label>}
        <button onClick={this.onAddInput} type="button" className="btn btn-group-input btn-green">
          Add
        </button>
        {listOfPairs.size ? (
          listOfPairs.map((pair, i) => (
            <div key={`sibling-${i}`}>
              <SearchSelect
                label={keyInputProps.label}
                selectedOption={pair.get('plasticType')}
                onChange={e => this.onTextChange(e.value, 'plasticType', i)}
                {...keyInputProps}
              />
              <TextInput
                type="number"
                value={pair.get('quantity')}
                onChange={e => this.onTextChange(e.value, 'quantity', i)}
                {...valueInputProps}
              />
              <button onClick={() => this.onRemoveInput(i)} type="button" className="btn btn-red">
                delete
              </button>
            </div>
          ))
        ) : (
          <p>None</p>
        )}
      </div>
    );
  }
}

PlasticTypeQuantityGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  keyInputProps: PropTypes.object,
  valueInputProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  listOfPairs: PropTypes.instanceOf(List),
};

export default PlasticTypeQuantityGroup;

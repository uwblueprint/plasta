import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import classNames from 'classnames';
import { plasticOptions, plasticOptionsByName } from '../utils/project';
import TextInput from './TextInput';
import SearchSelect from './SearchSelect';
import './InputGroup.css';

class PlasticTypeQuantityGroup extends Component {
  constructor(props) {
    super(props);
    this.onAddInput = this.onAddInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onPlasticTypeChange = this.onPlasticTypeChange.bind(this);
  }

  onPlasticTypeChange(newType, index) {
    if (!newType) return;
    this.onFieldChange(newType.value, 'plasticType', index);
  }

  onQuantityChange(newQuantity, index) {
    const quantity = parseFloat(newQuantity, 10);
    isNaN(quantity)
      ? this.onFieldChange('', 'quantity', index)
      : this.onFieldChange(quantity, 'quantity', index);
  }

  onFieldChange(updatedVal, field, index) {
    const list = this.props.plasticQuantities;
    const updatedList = list.update(index, pair => pair.set(field, updatedVal));
    this.onChange(updatedList);
  }

  onChange(updatedList) {
    this.props.onChange({ value: updatedList, key: this.props.field });
  }

  onRemoveInput(i) {
    const list = this.props.plasticQuantities;
    const updatedList = list.delete(i);
    this.onChange(updatedList);
  }

  onAddInput() {
    const list = this.props.plasticQuantities;
    const updatedList = list.push(
      Map({
        plasticType: plasticOptions[0].value,
        quantity: 0,
      })
    );
    this.onChange(updatedList);
  }

  render() {
    const { label, plasticQuantities } = this.props;
    return (
      <div className={classNames('input-group', this.props.className)}>
        {label && <label className="title">{label}</label>}
        <button onClick={this.onAddInput} type="button" className="btn btn-group-input btn-green">
          Add
        </button>
        {plasticQuantities.size ? (
          plasticQuantities.map((pair, i) => (
            <div key={`sibling-${i}`}>
              <SearchSelect
                options={plasticOptions}
                selectedOption={plasticOptionsByName.get(pair.get('plasticType'))}
                onChange={e => this.onPlasticTypeChange(e.value, i)}
              />
              <TextInput
                type="number"
                value={pair.get('quantity')}
                rightlabel="kg"
                onChange={e => this.onQuantityChange(e.value, i)}
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
  onChange: PropTypes.func.isRequired,
  plasticQuantities: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      plasticType: PropTypes.string.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default PlasticTypeQuantityGroup;

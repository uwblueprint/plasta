import React, { Component } from 'react';
import { List } from 'immutable';
import TransactionHistory from './TransactionHistory';
import TextInput from './input-components/TextInput';
import './ProjectSingle.css';
import { fakeData } from './fakeData';

class ProjectSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Project Name',
      checklistItems: List([{ isComplete: false, label: 'Item 1' }]),
      newItemValue: '',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.addChecklistItem = this.addChecklistItem.bind(this);
    this.updateCompletionStatus = this.updateCompletionStatus.bind(this);
  }

  updateCompletionStatus(idx) {
    this.setState({
      checklistItems: this.state.checklistItems.update(idx, old => {
        return {
          isComplete: !old.isComplete,
          label: old.label,
        };
      }),
    });
  }

  addChecklistItem() {
    if (!this.state.newItemValue) return;
    this.setState({
      checklistItems: this.state.checklistItems.push({
        isComplete: false,
        label: this.state.newItemValue,
      }),
      newItemValue: '',
    });
  }

  onFieldChange(field) {
    this.setState({ [field.key]: field.value });
  }

  render() {
    const checklistItems = this.state.checklistItems.toArray();
    return (
      <div className="page-wrapper" id="proj-page-wrapper">
        <h1>{this.state.name}</h1>
        <h2>Transaction History</h2>
        <TransactionHistory data={fakeData} />
        <h2>Project Checklist</h2>
        <TextInput
          field="newItemValue"
          value={this.state.newItemValue}
          onChange={this.onFieldChange}
        />
        <button type="button" className="btn btn-add" onClick={this.addChecklistItem}>
          Add
        </button>
        {checklistItems.map((item, i) => (
          <label className="checklist-item" key={item.label}>
            <input
              type="checkbox"
              checked={item.isComplete}
              onClick={() => this.updateCompletionStatus(i)}
            />
            {item.label}
          </label>
        ))}
      </div>
    );
  }
}

export default ProjectSingle;

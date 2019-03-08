import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setHeaderBar } from '../../actions';
import CreateWastePicker from './CreateWastePicker';
import CreateExternalPS from './CreateExternalPS';
import SearchSelect from '../input-components/SearchSelect';
import { onFieldChange } from '../utils/form';
import '../FormPage.css';

const stakeholderOptions = [
  { label: 'Wastepicker', value: 'wastepicker' },
  { label: 'Scrap Shop', value: 'scrap_shop' },
  { label: 'Dry Waste Collection Centre', value: 'dwcc' },
];

class CreateStakeholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stakeholderType: stakeholderOptions[0],
    };

    this.onFieldChange = onFieldChange.bind(this);
  }

  componentDidMount() {
    this.props.setHeaderBar({ title: 'New Stakeholder', matIcon: 'person_add' });
  }

  render() {
    const stakeholderType = this.state.stakeholderType.value;
    return (
      <div className="page-wrapper" id="new-stakeholder-wrapper">
        <p className="required-field-notif">
          All fields marked with <b>*</b> are required.
        </p>

        <h3 className="label">Stakeholder Type</h3>
        <SearchSelect
          field="stakeholderType"
          value={stakeholderType}
          onChange={this.onFieldChange}
          options={stakeholderOptions}
          clearable={false}
        />

        {stakeholderType === 'wastepicker' ? (
          <CreateWastePicker />
        ) : (
          <CreateExternalPS stakeholderType={this.state.stakeholderType} />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setHeaderBar: payload => dispatch(setHeaderBar(payload)),
});

export default connect(
  null,
  mapDispatchToProps
)(CreateStakeholder);

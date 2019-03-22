import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setHeaderBar } from '../../actions';
import CreateWastePicker from './CreateWastePicker';
import CreateExternalPS from './CreateExternalPS';
import SearchSelect from '../input-components/SearchSelect';
import { onFieldChange } from '../utils/form';
import { newWastepickerWhite } from '../../assets/icons';
import '../FormPage.css';

const stakeholderOptions = [
  { label: 'Wastepicker', value: 'wastepicker' },
  { label: 'Scrap Shop', value: 'external_scrap_shop' },
  { label: 'Dry Waste Collection Centre', value: 'external_dwcc' },
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
    this.props.setHeaderBar({ title: 'New Stakeholder', icon: newWastepickerWhite });
  }

  render() {
    const stakeholderType = this.state.stakeholderType.value;
    return (
      <div className="page-wrapper" id="new-stakeholder-wrapper">
        <p className="required-field-notif">
          All fields marked with <b>*</b> are required.
        </p>

        <SearchSelect
          label="Stakeholder Type"
          field="stakeholderType"
          value={this.state.stakeholderType}
          onChange={this.onFieldChange}
          options={stakeholderOptions}
          isClearable={false}
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

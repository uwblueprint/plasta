import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import SearchSelect from '../input-components/SearchSelect';
import IconTextInput from '../input-components/IconTextInput';
import { RULE_TYPES, onFieldChange, isFormValid, onValidation } from '../utils/form';
import OnSubmitButton from '../common/OnSubmitButton';
import FileInput from '../input-components/FileInput';
import CancelButton from '../common/CancelButton.js';
import { postMultiType, get } from '../utils/requests';
import { removeUnderscoresAndCapitalize } from '../utils/vendors';
import { snakeCase } from 'lodash';
import { connect } from 'react-redux';
import { loadVendors } from '../../actions';
import { name as NameIcon, phone as PhoneIcon, home as HomeIcon, globe } from '../../assets/icons';

const availableLanguages = [
  { label: 'Hindi', value: 'hindi' },
  { label: 'Kannada', value: 'kannada' },
  { label: 'Tamil', value: 'tamil' },
  { label: 'English', value: 'english' },
  { label: 'Bengali', value: 'bengali' },
  { label: 'Gujarati', value: 'gujarati' },
  { label: 'Telegu', value: 'telegu' },
];

const availableZones = [
  { label: 'North', value: 'north' },
  { label: 'East', value: 'east' },
  { label: 'South', value: 'south' },
  { label: 'West', value: 'west' },
  { label: 'Central', value: 'central' },
];

const fieldsInfo = {
  name: { label: 'Name', default: '', isRequired: true },
  phoneNumber: { label: 'Phone', default: '', isRequired: true, type: 'metaData' },
  phoneType: { label: 'Type of Phone', default: '', isRequired: false, type: 'metaData' },
  vendorSubtype: { label: 'Wastepicker Type', isRequired: true },
  picture: { label: 'Wastepicker Picture', default: '', isRequired: false },
  address: { label: 'Address', default: '', isRequired: false, type: 'metaData' },
  language: { label: 'Spoken Language', default: 'hindi', isRequired: false, type: 'metaData' },
  zone: { label: 'Zone', default: '', isRequired: false, type: 'metaData' },
};

class CreateWastePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitAttempted: false,
      wastepickerTypes: [],
    };
    Object.keys(fieldsInfo).forEach(field => (this.state[field] = fieldsInfo[field].default));
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = isFormValid.bind(this);
    this.onValidation = onValidation.bind(this);
  }

  async onSubmit() {
    if (!this.state.submitAttempted) this.setState({ submitAttempted: true }); // move out once onsubmit dispatched through redux
    if (!this.isFormValid()) {
      return Promise.reject('Please resolve all errors before submitting.');
    }
    const metaData = {};
    const data = [];
    Object.keys(fieldsInfo).forEach(field => {
      if (!this.state[field]) return;
      const fieldValue = this.state[field].value ? this.state[field].value : this.state[field];
      if (fieldsInfo[field].type === 'metaData') metaData[snakeCase(field)] = fieldValue;
      else {
        data.push({
          key: snakeCase(field),
          value: fieldValue,
        });
      }
    });
    data.push({ key: 'meta_data', value: metaData });

    const authToken = this.props.cookies.get('access_token');
    try {
      await postMultiType('/vendors', { data: data, authToken });
      const vendors = await get('/vendors', authToken);
      this.props.loadVendors(vendors.data);
    } catch (err) {
      throw err;
    }
  }

  async componentDidMount() {
    const wastepickerTypes = await get(
      '/vendors/wastepicker_types',
      this.props.cookies.get('access_token')
    );
    wastepickerTypes.data.forEach(function(option) {
      if (option.value === 'external_dwcc' || option.value === 'external_scrap_shop') {
        return;
      } else if (option.value === 'wastepicker') {
        option['label'] = 'Waste Picker (General)';
      } else if (option.value === 'wp_community_leader') {
        option['label'] = 'Waste Picker Community Leader';
      } else {
        option['label'] = removeUnderscoresAndCapitalize(option.value);
      }
    });
    this.setState({
      wastepickerTypes: wastepickerTypes.data,
    });
  }

  render() {
    const submitAttempted = this.state.submitAttempted;
    return (
      <div>
        <IconTextInput
          id="name"
          label="Name *"
          field="name"
          value={this.state.name}
          iconimage={NameIcon}
          onChange={this.onFieldChange}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          onValidation={this.onValidation}
          showErrors={submitAttempted}
        />
        <IconTextInput
          id="phoneNumber"
          label="Phone "
          field="phoneNumber"
          value={this.state.phoneNumber}
          iconimage={PhoneIcon}
          onChange={this.onFieldChange}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          onValidation={this.onValidation}
          showErrors={submitAttempted}
        />

        <SearchSelect
          label={fieldsInfo.phoneType.label}
          field="phoneType"
          value={this.state.phoneType}
          options={[
            { label: 'Basic Phone', value: 'basic' },
            { label: 'Smart Phone', value: 'smart' },
          ]}
          onChange={this.onFieldChange}
          isSearchable={false}
        />

        <SearchSelect
          label={fieldsInfo.vendorSubtype.label}
          field="vendorSubtype"
          value={this.state.vendorSubtype}
          options={this.state.wastepickerTypes}
          onChange={this.onFieldChange}
          onValidation={this.onValidation}
          showErrors={submitAttempted}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
        />

        <FileInput
          className="large-input full-width"
          field="picture"
          value={this.state.picture}
          onChange={this.onFieldChange}
        />

        <IconTextInput
          id="address"
          label="Address"
          field="address"
          type="text"
          value={this.state.address}
          iconimage={HomeIcon}
          onChange={this.onFieldChange}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          onValidation={this.onValidation}
          showErrors={submitAttempted}
        />

        <SearchSelect
          label="Language"
          field="language"
          iconimage={globe}
          value={this.state.language}
          options={availableLanguages}
          onChange={this.onFieldChange}
        />

        <SearchSelect
          label="Zone"
          field="zone"
          value={this.state.zone}
          options={availableZones}
          onChange={this.onFieldChange}
        />
        <div style={{ textAlign: 'center' }}>
          <CancelButton />
          {/* TODO (XIN): Add nextPath for on successful submit*/}
          <OnSubmitButton nextPath="/ps/transaction-history" onClick={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadVendors: payload => dispatch(loadVendors(payload)),
});

export default withCookies(
  connect(
    null,
    mapDispatchToProps
  )(CreateWastePicker)
);

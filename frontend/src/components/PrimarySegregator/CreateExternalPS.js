import React, { Component } from 'react';
import { connect } from 'react-redux';
import { snakeCase } from 'lodash';
import { withCookies } from 'react-cookie';
import IconTextInput from '../input-components/IconTextInput';
import { RULE_TYPES, onFieldChange, isFormValid, onValidation } from '../utils/form';
import { post, get } from '../utils/requests';
import CancelButton from '../common/CancelButton.js';
import OnSubmitButton from '../common/OnSubmitButton';
import { loadVendors } from '../../actions';
import { store as StoreIcon, phone as PhoneIcon, home as HomeIcon } from '../../assets/icons';

import '../FormPage.css';

const fieldsInfo = {
  name: { label: 'Name', default: '' },
  phoneNumber: { label: 'Phone', default: '', type: 'metaData' },
  address: { label: 'Address', default: '', type: 'metaData' },
};

class CreateExternalPS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitAttempted: false,
    };
    Object.keys(fieldsInfo).forEach(field => (this.state[field] = fieldsInfo[field].default));
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

    const vendorSubType = this.props.stakeholderType.value;
    const data = { vendor_subtype: vendorSubType, meta_data: {} };
    Object.keys(fieldsInfo).forEach(field => {
      if (!this.state[field]) return;
      if (fieldsInfo[field].type === 'metaData')
        data.meta_data[snakeCase(field)] = this.state[field];
      else data[snakeCase(field)] = this.state[field];
    });

    const authToken = this.props.cookies.get('access_token');
    try {
      await post('/vendors', { data: data, authToken });
      const vendors = await get('/vendors', authToken);
      this.props.loadVendors(vendors.data);
    } catch (err) {
      throw err;
    }
  }

  render() {
    return (
      <div>
        <IconTextInput
          id="name"
          label="Name *"
          field="name"
          type="text"
          value={this.state.name}
          iconimage={StoreIcon}
          onChange={this.onFieldChange}
          onValidation={this.onValidation}
          rules={[RULE_TYPES.FIELD_REQUIRED]}
          showErrors={this.state.submitAttempted}
        />

        <IconTextInput
          id="phoneNumber"
          label="Phone "
          field="phoneNumber"
          type="tel"
          value={this.state.phoneNumber}
          iconimage={PhoneIcon}
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
        />
        <div style={{ textAlign: 'center' }}>
          <CancelButton />
          {/* TODO (XIN): Add nextPath for on successful submit*/}
          <OnSubmitButton onClick={this.onSubmit} />
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
  )(CreateExternalPS)
);

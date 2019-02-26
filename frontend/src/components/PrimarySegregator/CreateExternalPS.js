import React, { Component } from 'react';
import { connect } from 'react-redux';
import { snakeCase } from 'lodash';
import { withCookies } from 'react-cookie';
import FormSection from '../input-components/FormSection';
import TextInput from '../input-components/TextInput';
import { RULE_TYPES, onFieldChange, isFormValid, onValidation } from '../utils/form';
import { post, get } from '../utils/requests';
import CancelButton from '../common/CancelButton.js';
import OnSubmitButton from '../common/OnSubmitButton';
import { loadVendors } from '../../actions';
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
        <FormSection title="Identification">
          <h3 className="label">Name *</h3>
          <TextInput
            className="emphasis-input full-width"
            field="name"
            value={this.state.name}
            placeholder="Your answer here..."
            onChange={this.onFieldChange}
            onValidation={this.onValidation}
            rules={[RULE_TYPES.FIELD_REQUIRED]}
            showErrors={this.state.submitAttempted}
          />

          <h3 className="label">Phone</h3>
          <TextInput
            className="large-input full-width"
            type="tel"
            field="phoneNumber"
            value={this.state.phoneNumber}
            placeholder="9988776655"
            onChange={this.onFieldChange}
          />

          <h3 className="label">Address</h3>
          <TextInput
            className="large-input full-width"
            field="address"
            value={this.state.address}
            onChange={this.onFieldChange}
          />
        </FormSection>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { onFieldChange, isFormValid, onValidation } from '../utils/form';
import CancelButton from '../common/CancelButton.js';
import './../FormPage.css';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import PrimarySegregatorTransaction from './PrimarySegregatorTransaction';
import { get } from '../utils/requests';
import { findVendorsByTypes, findVendorsByIds } from '../utils/vendors';

export const transactionTypes = {
  BUY: 1,
  SELL: 2,
};

function composeTransaction(members) {
  return class TransactionContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: {},
        submitAttempted: false,
        stakeholderName: {},
        plasticType: {},
        unitPrice: '',
        weight: '',
        transactionDate: '',
        showModal: false,
        stakeholderOptions: [],
      };
      this.onSubmit = members.onSubmit.bind(this);
      this.onFieldChange = onFieldChange.bind(this);
      this.handleDayChange = this.handleDayChange.bind(this);
      this.handleNewStakeholder = this.handleNewStakeholder.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.isFormValid = isFormValid.bind(this);
      this.onValidation = onValidation.bind(this);
    }

    static propTypes = {
      currentUser: PropTypes.object.isRequired,
      vendors: PropTypes.array.isRequired,
    };

    componentDidMount() {
      const currentVendorId = this.props.currentUser.userDetails.id;
      if (members.transactionType === transactionTypes.BUY) {
        const url = `/vendors/primary_segregator/${currentVendorId}/wastepickers`;
        get(url, this.props.cookies.get('access_token')).then(res => {
          const stakeholderOptions = findVendorsByIds(this.props.vendors, res.data).map(
            buyVendor => ({
              label: buyVendor.name,
              value: buyVendor.id,
              imageLink: buyVendor.image_link,
            })
          );
          this.setState({
            stakeholderOptions: stakeholderOptions,
          });
        });
      } else {
        const stakeholderOptions = findVendorsByTypes(this.props.vendors, [
          'wholesaler',
          'primary_segregator',
        ]).map(sellVendor => ({
          label: sellVendor.name,
          value: sellVendor.id,
          imageLink: sellVendor.image_link,
        }));
        this.setState({
          stakeholderOptions: stakeholderOptions,
        });
      }
    }

    hideModal() {
      this.setState({ showModal: false });
    }

    handleNewStakeholder() {
      this.setState({ showModal: true });
    }

    handleDayChange(input, value) {
      this.setState({ [input]: moment(value).format('YYYY-MM-DD') });
    }

    componentDidUpdate() {
      // If "Create new stakeholder" chosen as stakeholderOption, display
      // modal to create new stakeholder
      if (this.state.stakeholderName &&
        this.state.stakeholderName.value === 'create-new' &&
        this.state.showModal === false) {
        this.handleNewStakeholder();
        this.setState({
          stakeholderName: {}
        });
      }
    }

    render() {
      return (
        <div id="transactions-wrapper">
          <CancelButton context={this.context} />
          <PrimarySegregatorTransaction
            title={members.transactionType === transactionTypes.BUY ? 'Buy' : 'Sell'}
            transactionType={members.transactionType}
            onSubmit={this.onSubmit}
            onValidation={this.onValidation}
            isFormValid={this.isFormValid}
            handleDayChange={this.handleDayChange}
            handleNewStakeholder={this.handleNewStakeholder}
            showModal={this.showModal}
            hideModal={this.hideModal}
            onFieldChange={this.onFieldChange}
            stakeholderOptions={this.state.stakeholderOptions}
            {...this.state}
          />
        </div>
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    vendors: state.vendors,
  };
};

function composeTransactions(members) {
  return withCookies(
    connect(
      mapStateToProps,
      null
    )(composeTransaction(members))
  );
}

export default composeTransactions;

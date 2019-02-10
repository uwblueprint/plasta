import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { onFieldChange, isFormValid, onValidation } from '../utils/form';
import CancelButton from '../common/CancelButton.js';
import './../FormPage.css';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import CreatePSTransaction from './CreatePSTransaction';
import { get, post } from '../utils/requests';
import { findVendorsByTypes, findVendorsByIds } from '../utils/vendors';
import { loadTransactions } from '../../actions';
import personImage from '../../assets/person.png';

export const transactionTypes = {
  BUY: 'buy',
  SELL: 'sell',
};

class CreatePSTransactionContainer extends Component {
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
    this.onSubmit = this.onSubmit.bind(this);
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
    const transactionType = this.props.match.params.transactionType;
    const currentVendorId = this.props.currentUser.userDetails.id;

    new Promise(async res => {
      if (transactionType === transactionTypes.BUY) {
        const url = `/vendors/primary_segregator/${currentVendorId}/wastepickers`;
        const wastepickers = await get(url, this.props.cookies.get('access_token'));
        res(findVendorsByIds(this.props.vendors, wastepickers.data));
      }
      // SELL trans
      res(findVendorsByTypes(this.props.vendors, ['wholesaler', 'primary_segregator']));
    })
      .then(stakeholderOptions => {
        const stakeholders = stakeholderOptions.map(vendor => ({
          label: vendor.name,
          value: vendor.id,
          imageLink: vendor.image_link || personImage,
        }));
        this.setState({
          stakeholderOptions: stakeholders,
        });
      })
      .catch(err => {
        // TODO handle error
      });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  handleNewStakeholder() {
    this.setState({ showModal: true });
  }

  handleDayChange(value) {
    this.setState({ transactionDate: moment(value).format('YYYY-MM-DD') });
  }

  componentDidUpdate() {
    // If "Create new stakeholder" chosen as stakeholderOption, display
    // modal to create new stakeholder
    if (
      this.state.stakeholderName &&
      this.state.stakeholderName.value === 'create-new' &&
      this.state.showModal === false
    ) {
      this.handleNewStakeholder();
      this.setState({
        stakeholderName: {},
      });
    }
  }

  async onSubmit() {
    if (!this.state.submitAttempted) this.setState({ submitAttempted: true }); // move out once onsubmit dispatched through redux
    if (!this.isFormValid()) {
      return Promise.reject('Please resolve all errors before submitting.');
    }

    const transactionType = this.props.match.params.transactionType;
    const currentVendorId = this.props.currentUser.userDetails.vendor_id;
    const totalPrice = this.state.unitPrice * this.state.weight;
    const stakeholderName = this.state.stakeholderName;
    const saleDate = this.state.transactionDate;
    let fromVendor = transactionType === transactionTypes.BUY ? stakeholderName : currentVendorId;
    let toVendor = transactionType === transactionTypes.BUY ? currentVendorId : stakeholderName;

    let transactionData = {
      from_vendor_id: fromVendor,
      to_vendor_id: toVendor,
      price: totalPrice,
      plastics: [
        {
          plastic_type: this.state.plasticType.value,
          quantity: this.state.weight,
          price: totalPrice,
        },
      ],
      creator_id: currentVendorId,
      sale_date: saleDate !== '' ? saleDate : moment(Date.now()).format('YYYY-MM-DD'),
    };

    post(`/vendors/${transactionData.creator_id}/transactions`, {
      data: transactionData,
      authToken: this.props.cookies.get('access_token'),
    }).catch(err => {
      console.error(err);
      alert('There was a problem submitting the transaction. Please try again.');
    });

    const transactions = await get(
      `/vendors/${this.props.currentUser.userDetails.id}/transactions`,
      this.props.cookies.get('access_token')
    );
    this.props.loadTransactions(transactions.data);
  }

  render() {
    const transactionType = this.props.match.params.transactionType;
    return (
      <div id="transactions-wrapper">
        <CancelButton context={this.context} />
        <CreatePSTransaction
          title={transactionType === transactionTypes.BUY ? 'Buy' : 'Sell'}
          transactionType={transactionType}
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
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    vendors: state.vendors,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = dispatch => ({
  loadTransactions: payload => dispatch(loadTransactions(payload)),
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreatePSTransactionContainer)
);

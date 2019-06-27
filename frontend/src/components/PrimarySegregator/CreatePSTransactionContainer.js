import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { onFieldChange, isFormValid, onValidation } from '../utils/form';
import { TRANSACTION_TYPES } from '../utils/transactions';
import './../FormPage.css';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import CreatePSTransaction from './CreatePSTransaction';
import { get, postMultiType } from '../utils/requests';
import { findVendorsByTypes, findVendorsByIds } from '../utils/vendors';
import { loadTransactions, setHeaderBar } from '../../actions';
import personImage from '../../assets/person.png';
import { newBuyWhite as buyIcon, sellWhite as sellIcon } from '../../assets/icons';
import { getPlasticTypesByTransactionType } from '../utils/plastic';

class CreatePSTransactionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitAttempted: false,
      stakeholderName: null,
      plasticType: null,
      unitPrice: '',
      weight: '',
      transactionDate: moment(Date.now()).format('YYYY-MM-DD'),
      showModal: false,
      stakeholderOptions: [],
      receiptPicture: {},
      isEdit: false,
      transactionId: '',
      transactionDateForEdit: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = onFieldChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleNewStakeholder = this.handleNewStakeholder.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.refreshStakeholderOptions = this.refreshStakeholderOptions.bind(this);
    this.setHeaderBar = this.setHeaderBar.bind(this);

    this.isFormValid = isFormValid.bind(this);
    this.onValidation = onValidation.bind(this);
  }

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    vendors: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.refreshStakeholderOptions();
    this.setHeaderBar();
    this.getTransaction();
  }

  componentDidUpdate(prevProps) {
    // If "Create new stakeholder" chosen as stakeholderOption, display
    // modal to create new stakeholder
    if (this.state.stakeholderName && this.state.stakeholderName.value === 'create-new') {
      this.handleNewStakeholder();
    } else if (prevProps.match.params.transactionType !== this.props.match.params.transactionType) {
      this.refreshStakeholderOptions();
      this.setHeaderBar();
    }
  }

  async getTransaction() {
    const transactionId = this.props.match.params.transactionId;
    const transactionType = this.props.match.params.transactionType;

    if (transactionId) {
      const authToken = this.props.cookies.get('access_token');
      const currentVendorId = this.props.currentUser.userDetails.vendor_id;
      const dbTransaction = await get(
        `/vendors/${currentVendorId}/transactions/${transactionId}`,
        authToken
      );
      this.setState({ transaction: dbTransaction.data });
      let dbPlasticType = dbTransaction.data.plastics.filter(ps => {
        return ps.transaction_id == transactionId;
      });
      let unitPrice = dbPlasticType[0]['price'] / dbPlasticType[0]['quantity'];
      const plasticTypes = getPlasticTypesByTransactionType(transactionType);

      let selectedPlasticType = plasticTypes.filter(ps => {
        return ps.value === dbPlasticType[0]['plastic_type'];
      });
      let selectedStakeholder = this.state.stakeholderOptions.filter(obj => {
        return transactionType == 'buy'
          ? obj.value === dbTransaction.data.from_vendor_id
          : obj.value === dbTransaction.data.to_vendor_id;
      });
      this.setState({ unitPrice: unitPrice + '' });
      this.setState({ weight: dbPlasticType[0]['quantity'] + '' });
      this.setState({ plasticType: selectedPlasticType[0] });
      this.setState({ stakeholderName: selectedStakeholder[0] });
      this.setState({ isEdit: true });
      this.setState({ transactionId: transactionId });
    }
  }

  async refreshStakeholderOptions() {
    const transactionType = this.props.match.params.transactionType;
    const currentVendorId = this.props.currentUser.userDetails.vendor_id;

    // SELL trans
    let vendors = findVendorsByTypes(
      this.props.vendors,
      ['wholesaler', 'primary_segregator'],
      currentVendorId
    );
    if (transactionType === TRANSACTION_TYPES.BUY) {
      const url = `/vendors/primary_segregator/${currentVendorId}/wastepickers`;
      const wastepickers = await get(url, this.props.cookies.get('access_token'));
      vendors = findVendorsByIds(this.props.vendors, wastepickers.data);
    }

    const stakeholders = vendors.map(vendor => ({
      label: vendor.name,
      value: vendor.id,
      imageLink: vendor.image_link || personImage,
    }));

    this.setState({ stakeholderOptions: stakeholders });
  }

  setHeaderBar() {
    const transactionType = this.props.match.params.transactionType;
    const header = {
      title: `New ${transactionType === TRANSACTION_TYPES.BUY ? 'Buy' : 'Sell'}`,
      icon: transactionType === TRANSACTION_TYPES.BUY ? buyIcon : sellIcon,
    };
    this.props.setHeaderBar(header);
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  handleNewStakeholder() {
    this.props.history.push('/ps/stakeholders/new');
  }

  handleDayChange(value) {
    this.setState({ transactionDate: moment(value).format('YYYY-MM-DD') });
    if (this.state.isEdit) {
      this.setState({ transactionDateForEdit: moment(value).format('YYYY-MM-DD') });
    }
  }

  async onSubmit() {
    if (!this.state.submitAttempted) this.setState({ submitAttempted: true }); // move out once onsubmit dispatched through redux
    if ((this.state.isEdit === false) & !this.isFormValid()) {
      return Promise.reject('Please fill in all required fields before submitting.');
    }
    // console.log(this.state)
    const transactionType = this.props.match.params.transactionType;
    const currentUserId = this.props.currentUser.userDetails.id; // User ID and vendor ID are distinct
    const currentVendorId = this.props.currentUser.userDetails.vendor_id;
    const totalPrice = this.state.unitPrice * this.state.weight;
    const stakeholderName = this.state.stakeholderName;
    const saleDate = this.state.transactionDate;
    let fromVendor =
      transactionType === TRANSACTION_TYPES.BUY ? stakeholderName.value : currentVendorId;
    let toVendor =
      transactionType === TRANSACTION_TYPES.BUY ? currentVendorId : stakeholderName.value;
    const receiptPicture = this.state.receiptPicture;
    const utcTimeOffset = new Date().getTimezoneOffset();

    const data = [
      {
        key: 'from_vendor_id',
        value: fromVendor,
      },
      {
        key: 'to_vendor_id',
        value: toVendor,
      },
      {
        key: 'price',
        value: totalPrice,
      },
      {
        key: 'plastics',
        value: [
          {
            plastic_type: this.state.plasticType.value,
            quantity: this.state.weight,
            price: totalPrice,
          },
        ],
      },
      {
        key: 'creator_id',
        value: currentUserId,
      },
      {
        key: 'sale_date',
        value: moment(saleDate)
          .add(utcTimeOffset, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
      },
    ];

    if (receiptPicture instanceof File) {
      data.push({
        key: 'picture',
        value: receiptPicture,
      });
    }

    const authToken = this.props.cookies.get('access_token');
    try {
      let transactionId = this.state.transactionId;
      if (transactionId) {
        data.push({
          key: 'transaction_id',
          value: transactionId,
        });
        await postMultiType(`/vendors/${currentVendorId}/transaction/${transactionId}`, {
          data: data,
          authToken,
        });
      } else {
        await postMultiType(`/vendors/${currentVendorId}/transactions`, { data: data, authToken });
      }
      const transactions = await get(`/vendors/${currentVendorId}/transactions`, authToken);
      this.props.loadTransactions(transactions.data);
    } catch (err) {
      alert('There was a problem submitting the transaction. Please try again.');
    }
  }

  render() {
    const transactionType = this.props.match.params.transactionType;
    return (
      <CreatePSTransaction
        title={transactionType === TRANSACTION_TYPES.BUY ? 'Buy' : 'Sell'}
        transactionType={transactionType}
        onSubmit={this.onSubmit}
        onValidation={this.onValidation}
        isFormValid={this.isFormValid}
        handleDayChange={this.handleDayChange}
        onFieldChange={this.onFieldChange}
        stakeholderOptions={this.state.stakeholderOptions}
        transaction={this.state.transaction}
        {...this.state}
      />
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
  setHeaderBar: payload => dispatch(setHeaderBar(payload)),
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreatePSTransactionContainer)
);

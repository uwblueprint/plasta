import composeTransaction, { transactionTypes } from './HOCPrimarySegregatorTransaction';
import { post, get } from '../utils/requests';
import { connect } from 'react-redux';

async function onSubmit() {
  if (!this.state.submitAttempted) this.setState({ submitAttempted: true }); // move out once onsubmit dispatched through redux
  if (!this.isFormValid()) {
    return Promise.reject('Please resolve all errors before submitting.');
  }
  const totalPrice = this.state.unitPrice * this.state.weight;
  const transactionData = {
    // TODO(Nick): Get from_vendor_id & creator_id from user object in Redux store
    from_vendor_id: this.state.stakeholderName.value,
    to_vendor_id: 1,
    price: totalPrice,
    plastics: [
      {
        plastic_type: this.state.plasticType.value,
        quantity: this.state.weight,
        price: totalPrice,
      },
    ],
    creator_id: 1,
  };
  if (this.state.transactionDate !== '') {
    transactionData.sale_date = this.state.transactionDate;
  }
  post('/vendors/1/transactions', transactionData).catch(err => {
    alert('There was a problem submitting the transaction. Please try again.');
  });
}

function getStakeholderOptions() {
  const currentVendorId = this.props.currentUser.userDetails.vendor_id;
  const url = `/vendors/dwcc/${currentVendorId}/wastepickers`;
  get(url).then(res => console.log(res.data)); // This gives me an empty array always idk why
  const wastepickerIds = [2, 3];
  return this.props.vendors
    .filter(({ vendor_id }) => wastepickerIds.includes(vendor_id))
    .map(buyVendor => ({
      label: buyVendor.name,
      value: buyVendor.id,
    }));
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    vendors: state.vendors,
  };
};

const members = {
  onSubmit: onSubmit,
  transactionType: transactionTypes.BUY,
  getStakeholderOptions: getStakeholderOptions,
};

export default connect(mapStateToProps)(composeTransaction(members));

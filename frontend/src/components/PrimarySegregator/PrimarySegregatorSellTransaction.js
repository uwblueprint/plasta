import composeTransaction, { transactionTypes } from './HOCPrimarySegregatorTransaction';
import { get, post } from '../utils/requests';

async function onSubmit() {
  if (!this.state.submitAttempted) this.setState({ submitAttempted: true }); // move out once onsubmit dispatched through redux
  if (!this.isFormValid()) {
    return Promise.reject('Please resolve all errors before submitting.');
  }
  const totalPrice = this.state.unitPrice * this.state.weight;
  let transactionData = {
    from_vendor_id: this.props.currentUser.userDetails.vendor_id,
    to_vendor_id: this.state.stakeholderName.value,
    price: totalPrice,
    plastics: [
      {
        plastic_type: this.state.plasticType.value,
        quantity: this.state.weight,
        price: totalPrice,
      },
    ],
    creator_id: this.props.currentUser.userDetails.vendor_id,
  };
  if (this.state.transactionDate !== '') {
    transactionData.sale_date = this.state.transactionDate;
  }
  post(`/vendors/${transactionData.creator_id}/transactions`, {
    data: transactionData,
    authToken: this.props.cookies.get('access_token'),
  }).catch(err => {
    alert('There was a problem submitting the transaction. Please try again.');
  });
  const transactions = await get(`/vendors/${this.props.currentUser.userDetails.id}/transactions`);
  this.props.loadTransactions(transactions.data);
}

const members = {
  onSubmit: onSubmit,
  transactionType: transactionTypes.SELL,
};

export default composeTransaction(members);

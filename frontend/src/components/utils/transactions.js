export const fieldToLabelMap = {
  stakeholderName: 'Stakeholder name',
  plasticType: 'Plastic type',
  price: 'Price',
  weight: 'Weight',
};

export function filterSellTransactions(transactions, vendorId) {
  return transactions.filter(transaction => {
    return transaction.from_vendor_id === vendorId;
  });
}

export function filterBuyTransactions(transactions, vendorId) {
  return transactions.filter(transaction => {
    return transaction.to_vendor_id === vendorId;
  });
}

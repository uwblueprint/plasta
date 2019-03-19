export const fetchComplete = () => ({
  type: 'FETCH_COMPLETE',
});

export const submitForm = () => ({
  type: 'SUBMIT_FORM',
});

export const authenticateUser = currentUser => ({
  type: 'AUTHENTICATE_USER',
  currentUser,
});

export const loadVendors = vendors => ({
  type: 'LOAD_VENDORS',
  vendors,
});

export const loadTransactions = transactions => ({
  type: 'LOAD_TRANSACTIONS',
  transactions,
});

export const setHeaderBar = header => ({
  type: 'SET_HEADER_BAR',
  title: header.title,
  icon: header.icon,
  showLogout: header.showLogout, //added logout Icon on the right of header
  showTransactionTypes: header.showTransactionTypes,
  transactionType: header.transactionType,
});

export const setTransactionView = type => ({
  type: 'SET_TRANSACTION_VIEW',
  transactionType: type,
});

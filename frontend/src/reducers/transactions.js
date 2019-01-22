const transactions = (prevState = [], action) => {
  switch (action.type) {
    case 'LOAD_TRANSACTIONS':
      return action.transactions || [];
    default:
      return prevState;
  }
};

export default transactions;

const headerBar = (prevState = {}, action) => {
  switch (action.type) {
    case 'SET_HEADER_TITLE':
      return { ...action };
    case 'SET_TRANSACTION_VIEW':
      return {
        ...prevState,
        transactionType: action.transactionType,
      };
    default:
      return prevState;
  }
};

export default headerBar;

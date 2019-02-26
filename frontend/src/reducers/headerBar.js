const initHeader = {
  title: '',
  matIcon: '',
};

const headerBar = (prevState = initHeader, action) => {
  const { type, ...header } = action;
  switch (type) {
    case 'SET_HEADER_BAR':
      console.log('s');
      return { ...prevState, ...header };
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

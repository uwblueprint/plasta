const isLoading = (prevState = false, action) => {
  switch (action.type) {
    case 'SUBMIT_FORM':
      return true;
    case 'FETCH_COMPLETE':
      return false;
    default:
      return prevState;
  }
};

export default isLoading;

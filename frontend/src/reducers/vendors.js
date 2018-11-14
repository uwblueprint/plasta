const vendors = (prevState = [], action) => {
  switch (action.type) {
    case 'APP_LOAD':
      return action.vendors || [];
    default:
      return prevState;
  }
};

export default vendors;

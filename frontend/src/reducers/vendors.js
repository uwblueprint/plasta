const vendors = (prevState = null, action) => {
  switch (action.type) {
    case 'LOAD_VENDORS':
      return action.vendors || [];
    default:
      return prevState;
  }
};

export default vendors;

const currentUser = (prevState = null, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return action.currentUser;
    default:
      return prevState;
  }
};

export default currentUser;

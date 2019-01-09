const currentUser = (prevState = null, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return action.currentUser;
    case 'CLEAR_USER':
      return null;
    default:
      return prevState;
  }
};

export default currentUser;

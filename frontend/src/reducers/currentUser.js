const currentUser = (prevState = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.currentUser;
    default:
      return prevState;
  }
};

export default currentUser;

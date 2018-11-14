const userObject = (prevState = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { email: action.email } || {};
    default:
      return prevState;
  }
};

export default userObject;

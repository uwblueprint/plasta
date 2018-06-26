const userEmail = (prevState='', action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return action.email;
    default:
      return prevState; 
  }
};

export default userEmail;

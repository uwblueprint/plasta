export const appLoad = payload => ({
  type: 'APP_LOAD',
  vendors: payload.vendors,
});

export const fetchComplete = () => ({
  type: 'FETCH_COMPLETE',
});

export const fetchUser = () => ({
  type: 'FETCH_USER',
});

export const submitForm = () => ({
  type: 'SUBMIT_FORM',
});

export const userAuthentication = currentUser => ({
  type: 'USER_LOGIN',
  currentUser,
});

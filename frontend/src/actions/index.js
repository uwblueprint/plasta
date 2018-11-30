export const appLoad = payload => ({
  type: 'APP_LOAD',
  vendors: payload.vendors,
});

export const fetchComplete = () => ({
  type: 'FETCH_COMPLETE',
});

export const submitForm = () => ({
  type: 'SUBMIT_FORM',
});

export const userAuthentication = (currentUser, vendors = []) => ({
  type: 'USER_LOGIN',
  currentUser,
  vendors,
});

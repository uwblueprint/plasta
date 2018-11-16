export const userAuthentication = currentUser => ({
  type: 'USER_LOGIN',
  currentUser,
});

export const appLoad = payload => ({
  type: 'APP_LOAD',
  vendors: payload.vendors,
});

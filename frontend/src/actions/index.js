export const userAuthentication = payload => ({
  type: 'USER_LOGIN',
  email: payload.email,
});

export const appLoad = payload => ({
  type: 'APP_LOAD',
  vendors: payload.vendors,
});

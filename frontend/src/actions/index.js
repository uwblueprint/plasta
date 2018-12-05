export const fetchComplete = () => ({
  type: 'FETCH_COMPLETE',
});

export const submitForm = () => ({
  type: 'SUBMIT_FORM',
});

export const userAuthentication = currentUser => ({
  type: 'USER_LOGIN',
  currentUser,
});

export const loadVendors = vendors => ({
  type: 'LOAD_VENDORS',
  vendors,
});

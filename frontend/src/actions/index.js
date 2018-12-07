export const clearUser = () => ({
  type: 'CLEAR_USER',
});
export const fetchComplete = () => ({
  type: 'FETCH_COMPLETE',
});

export const submitForm = () => ({
  type: 'SUBMIT_FORM',
});

export const userAuthentication = currentUser => ({
  type: 'AUTHENTICATE_USER',
  currentUser,
});

export const loadVendors = vendors => ({
  type: 'LOAD_VENDORS',
  vendors,
});

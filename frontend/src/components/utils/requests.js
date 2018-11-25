function getAuthorizationHeader(cookies) {
  return cookies
    ? {
        Authorization: `Bearer ${cookies.get('access_token')}`,
      }
    : {};
}

export function post(path, payload, cookies) {
  const url = process.env.REACT_APP_API_URL + path;
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(cookies),
    },
    body: JSON.stringify(payload),
  };
  return fetch(url, data)
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

<<<<<<< HEAD
// TODO : accept multiple images
export function postMultiType(path, fields) {
  const url = process.env.REACT_APP_API_URL + path;
  const formData = new FormData();
  fields.forEach(field => {
    formData.append(field.key, field.value);
  });
  return fetch(url, {
    method: 'POST',
    body: formData,
  });
}

export function get(path, payload) {
=======
export function get(path, cookies) {
>>>>>>> Redirecting user to correct page based on user type + moving DWCC transaction to DWCC folder + fix for currentUser redux store
  const url = process.env.REACT_APP_API_URL + path;
  const data = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(cookies),
    },
  };
  return fetch(url, data)
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

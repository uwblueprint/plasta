function getAuthorizationHeader(authToken) {
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
}

export function post(path, payload) {
  const url = process.env.REACT_APP_API_URL + path;
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(payload.authToken),
    },
    body: JSON.stringify(payload.data),
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

// TODO : accept multiple images
export function postMultiType(path, payload) {
  const url = process.env.REACT_APP_API_URL + path;
  const formData = new FormData();
  payload.data.forEach(field => {
    if (field.key === 'meta_data' || field.key === 'plastics') {
      formData.append(field.key, JSON.stringify(field.value));
    } else {
      formData.append(field.key, field.value);
    }
  });
  const data = {
    method: 'POST',
    headers: {
      ...getAuthorizationHeader(payload.authToken),
    },
    body: formData,
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

export function get(path, authToken) {
  const url = process.env.REACT_APP_API_URL + path;
  const data = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(authToken),
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

export function delete_request(path, authToken) {
  const url = process.env.REACT_APP_API_URL + path;
  const data = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(authToken),
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

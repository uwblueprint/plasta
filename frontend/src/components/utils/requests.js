function getAuthorizationHeader(cookies) {
  return cookies ? { Authorization: `Bearer ${cookies.get('access_token')}` } : {};
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

// TODO : accept multiple images
export function postMultiType(path, fields, cookies) {
  const url = process.env.REACT_APP_API_URL + path;
  const formData = new FormData();
  fields.forEach(field => {
    formData.append(field.key, field.value);
  });
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(cookies),
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

export function get(path, cookies) {
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

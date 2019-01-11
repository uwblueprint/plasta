import { Cookies } from 'react-cookie';

function getAuthorizationHeader(payload) {
  let accessToken = null;
  if (payload instanceof Cookies) accessToken = payload.get('access_token');
  else if (payload && payload.authToken) accessToken = payload.authToken;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
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

export function get(path, payload) {
  const url = process.env.REACT_APP_API_URL + path;
  const data = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(payload),
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

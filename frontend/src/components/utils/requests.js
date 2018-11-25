export function post(path, payload) {
  const url = process.env.REACT_APP_API_URL + path;
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
export function postMultiType(path, fields) {
  const url = process.env.REACT_APP_API_URL + path;
  const formData = new FormData();
  fields.forEach(field => {
    formData.append(field.key, field.value);
  });
  console.log(formData.get('picture'));
  return fetch(url, {
    method: 'POST',
    body: formData,
  });
}

export function get(path, payload) {
  const url = process.env.REACT_APP_API_URL + path;
  const data = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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

const BASE_URL = 'https://mate-api.herokuapp.com';

export function getTodos() {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    .then(json => json.data)
    .then(dotos => dotos.filter(({ id, title }) => id && title));
}

export function getUser(id) {
  return fetch(`${BASE_URL}/users/${id}`)
    .then(response => response.json())
    .then(json => json.data);
}

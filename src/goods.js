// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com`;

export function getAll() {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json())
    .then(json => json.data)
    .then(todos => todos.filter(({ id, title }) => id && title));
}

export function getUser(id) {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => response.json())
    .then(json => json.data);
}

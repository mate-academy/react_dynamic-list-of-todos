const API_URL = `https://mate-api.herokuapp.com`;

export function getTodos() {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json())
    .then(result => result.data)
    .then(result => result.filter(todo => todo.title !== null));
}

export function getUsers() {
  return fetch(`${API_URL}/users`)
    .then(response => response.json())
    .then(result => result.data);
}

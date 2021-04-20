// eslint-disable-next-line
const BASE_URL = `https://mate-api.herokuapp.com`;

export function getUser(userId) {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json())
    .then(response => response.data);
}

export function getTodos() {
  return fetch(`${BASE_URL}/todos/`)
    .then(response => response.json())
    .then(response => response.data.filter(todo => todo.userId));
}

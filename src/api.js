// eslint-disable-next-line
const API_URL_todos = `https://mate-api.herokuapp.com/todos`;

export function getAllTodos() {
  return fetch(API_URL_todos)
    .then(response => response.json());
}

export function getUser(userId) {
  return fetch(`https://mate-api.herokuapp.com/users/${userId}`)
    .then(response => response.json());
}

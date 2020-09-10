const API_TODOS = `https://mate-api.herokuapp.com/todos`;
const API_USERS = `https://mate-api.herokuapp.com/users`;

export function getTodos() {
  return fetch(API_TODOS)
    .then(response => response.json())
    .then(todos => todos.data);
}

export function getUsers() {
  return fetch(API_USERS)
    .then(response => response.json())
    .then(users => users.data);
}

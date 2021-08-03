
const TODOS_URL = `https://mate-api.herokuapp.com/todos`;
const USERS_URL = `https://mate-api.herokuapp.com/users/`;

export function allTodos() {
  return fetch(TODOS_URL)
    .then(response => response.json())
    .then(todos => todos.data.filter(todo => todo.userId && todo.title));
}

export function allUsers(url) {
  return fetch(USERS_URL + url)
    .then(response => response.json());
}

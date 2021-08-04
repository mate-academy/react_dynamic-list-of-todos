const USERS_URL = `https://mate-api.herokuapp.com/users/`;
const BASE_URL = `https://mate-api.herokuapp.com`;

export function getUser(url) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json())
    .then(todos => todos.data.filter(todo => todo.userId && todo.title));
}

export function users(url) {
  return fetch(`${USERS_URL}${url}`)
    .then(response => response.json());
}

export const UserTodos = () => getUser('/todos');

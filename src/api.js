// eslint-disable-next-line
const TODOS_URL = `https://mate-api.herokuapp.com/todos`;
const USERS_URL = `https://mate-api.herokuapp.com/users/`;

export function getTodos() {
  return fetch(TODOS_URL)
    .then(response => response.json());
}

export function getUsers(userId) {
  return fetch(`${USERS_URL}${userId}`)
    .then(response => response.json());
}

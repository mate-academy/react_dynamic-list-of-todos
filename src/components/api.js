const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

export function getTodos() {
  return fetch(TODOS_URL)
    .then(response => response.json())
    .then(result => result.data);
}

export function getUser(userId) {
  return fetch(`${USERS_URL}${userId}`)
    .then(response => response.json())
    .then(result => result.data);
}

const BASE_TODO_URL = 'https://mate-api.herokuapp.com/todos';
const BASE_USER_URL = 'https://mate-api.herokuapp.com/users/';

export function getTodos() {
  return fetch(BASE_TODO_URL)
    .then(result => result.json());
}

export function getUser(userId) {
  return fetch(`${BASE_USER_URL}/${userId}`)
    .then(result => result.json());
}

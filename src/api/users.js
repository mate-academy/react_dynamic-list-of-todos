// eslint-disable-next-line
const TODOS_URL = 'https://mate-api.herokuapp.com/todos';

export function getTodos() {
  return fetch(TODOS_URL)
    .then(response => response.json());
}

const USER_URL = 'https://mate-api.herokuapp.com/users/';

export function getUser(id) {
  return fetch(USER_URL + id)
    .then(response => response.json());
}

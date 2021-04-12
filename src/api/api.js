const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

export function getTodos() {
  return fetch(TODOS_URL)
    .then(response => response.json())
    .then(result => result.data)
    .catch(error => new Error(error));
}

export function getUser(id) {
  return fetch(USERS_URL + id)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => new Error(error));
}

const url = 'https://mate-api.herokuapp.com/todos';
const users = 'https://mate-api.herokuapp.com/users';

export function getAll() {
  return fetch(url)
    .then(response => response.json())
    .then(result => result.data);
}

export function getUsers(userId) {
  return fetch(`${users}/${userId}`)
    .then(response => response.json())
    .then(result => result.data);
}

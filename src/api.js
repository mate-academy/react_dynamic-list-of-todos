const url = 'https://mate-api.herokuapp.com';

export function getAll() {
  return fetch(`${url}/todos`)
    .then(response => response.json())
    .then(result => result.data);
}

export function getUsers(userId) {
  return fetch(`${url}/users/${userId}`)
    .then(response => response.json())
    .then(result => result.data);
}

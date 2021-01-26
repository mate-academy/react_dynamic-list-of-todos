const apiUrl = 'https://mate-api.herokuapp.com';

export function getAllTodos() {
  return fetch(`${apiUrl}/todos`)
    .then(response => response.json())
    .then(result => result.data);
}

export function getUser(userId) {
  return fetch(`${apiUrl}/users/${userId}`)
    .then(response => response.json())
    .then(user => user.data);
}

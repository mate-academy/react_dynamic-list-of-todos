const BASE_URL = 'https://mate-api.herokuapp.com';

export function loadTodos() {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    .then(response => response.data);
}

export function loadUsers(userId) {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json())
    .then(response => response.data);
}

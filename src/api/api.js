const API_URL = 'https://mate-api.herokuapp.com';

export function loadTodos() {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json())
    .then(response => response.data);
}

export function loadUsers(userId) {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json())
    .then(response => response.data);
}

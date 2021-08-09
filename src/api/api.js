const API_URL = 'https://mate-api.herokuapp.com';

export function getTodos() {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json())
    .then(result => result.data);
}

export function getUserData(userId) {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json())
    .then(result => result.data);
}

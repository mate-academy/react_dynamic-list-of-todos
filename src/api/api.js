const API_URL = 'https://mate-api.herokuapp.com';

export function getAllTodos() {
  return fetch(`${API_URL}/todos/`)
    .then(response => response.json())
    .then(response => response.data);
}

export const getUsersInfo = userId => (
  fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json())
    .then(response => response.data)
);

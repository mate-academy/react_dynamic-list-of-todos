const API_URL = 'https://mate.academy/students-api';

export function getTodos() {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
}

export function getUser(id: number) {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => response.json());
}

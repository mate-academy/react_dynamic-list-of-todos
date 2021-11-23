const BASE_URL = 'https://mate.academy/students-api';

export function getTodos() {
  return fetch(`${BASE_URL}/Todos`).then((response) => response.json());
}

export function getUser(id: number) {
  return fetch(`${BASE_URL}/users/${id}`).then((response) => response.json());
}

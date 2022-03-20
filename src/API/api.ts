export const BASE_URL = 'https://mate.academy/students-api';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    .catch();
}

export function getCurrentUser(userId: number): Promise<User> {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json())
    .catch(() => 0);
}

const API_URL = 'https://mate.academy/students-api';

export function getAllTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
}

export function getUser(n: number): Promise<User> {
  return fetch(`${API_URL}/users/${n}`)
    .then(response => response.json());
}

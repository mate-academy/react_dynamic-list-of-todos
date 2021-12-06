const API_URL = 'https://mate.academy/students-api';

export function getAllTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
}

export function getUserById(id: number): Promise<User> {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => response.json());
}

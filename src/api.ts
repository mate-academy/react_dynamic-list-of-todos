const API_URL = 'https://mate.academy/students-api';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
}

export function getUser(userId: number): Promise<User | null> {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json());
}

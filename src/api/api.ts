import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
}

export function getUser(id: number): Promise<User> {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject;
      }

      return response.json();
    });
}

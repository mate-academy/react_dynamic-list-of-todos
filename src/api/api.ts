import { Todo, User } from '../react-app-env';

export const API_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
}

export async function getUsers(userId: number): Promise<User> {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json());
}

import { Todo } from '../../src/types/Todo';
import { User } from '../../src/types/User';

// eslint-disable-next-line
const API_URL = `./api`;

export function getTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos.json`).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  });
}

export function getUser(userId: number): Promise<User[]> {
  return fetch(`${API_URL}/users/${userId}.json`).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  });
}

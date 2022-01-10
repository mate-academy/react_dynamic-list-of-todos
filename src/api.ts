import { Todo } from './type/todo';
import { User } from './type/user';

export function getTodos(): Promise<Todo[]> {
  const API_URL = 'https://mate.academy/students-api/todos';

  return fetch(API_URL)
    .then(response => response.json());
}

export function getUserById(userId: number): Promise<User> {
  const API_URL = `https://mate.academy/students-api/users/${userId}`;

  return fetch(API_URL)
    .then(response => response.json());
}

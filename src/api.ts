import { Todo } from './types/Todo';
import { User } from './types/User';

const API_URL = 'https://mate.academy/students-api/';

export function request(url: string) {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json());
}

export const getTodos = (): Promise<Todo[]> => (
  request('todos')
);

export function getUser(userId: number): Promise<User> {
  return request(`users/${userId}`);
}

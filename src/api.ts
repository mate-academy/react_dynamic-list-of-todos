import { Todo } from './types/Todo';
import { User } from './types/User';

const API_URL = 'https://mate.academy/students-api/todos';

export function getAllTodos(): Promise<Todo[]> {
  return fetch(API_URL)
    .then(response => response.json());
}

export const getUser = async (userId: number): Promise<User> => {
  return fetch(`https://mate.academy/students-api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('404');
      }

      return response.json();
    });
};

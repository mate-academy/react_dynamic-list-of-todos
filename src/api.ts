import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  return fetch(fullURL)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('Server don`t response'));
      }

      if (!response.headers.get('content-type')?.includes('application/json')) {
        return Promise.reject(new Error('Requested file not found'));
      }

      return response.json();
    });
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

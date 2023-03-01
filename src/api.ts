import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status}`));
      }

      if (
        !response?.headers?.get('content-type')?.includes('application/json')
      ) {
        return Promise.reject(new Error('Content format is not supported'));
      }

      return response.json();
    });
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

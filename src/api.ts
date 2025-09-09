import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string, options?: { signal?: AbortSignal }): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL, options))
    .then(res => {
      if (!res.ok) {
        throw new Error('Network error');
      }

      return res.json();
    });
}

export const getTodos = (options?: RequestOptions) =>
  get<Todo[]>('/todos', options);

export const getUser = (userId: number, options?: RequestOptions) =>
  get<User>(`/users/${userId}`, options);

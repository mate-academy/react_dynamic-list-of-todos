import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promime
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see now the laoder works
  // return wait(300)
  //   .then(() => fetch(fullURL))
  //   .then(res => res.json());
  return wait(300)
    .then(async () => {
      const response = await fetch(fullURL);
      const {
        ok,
        status,
        statusText,
        headers,
      } = response;

      if (!ok) {
        throw new Error(`${status} - ${statusText}`);
      }

      if (!headers.get('content-type')?.includes('application/json')) {
        throw new Error('Content-type is not supported');
      }

      return response.json();
    });
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

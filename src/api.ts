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
  return wait(1000)
    .then(() => fetch(fullURL))
    .then(response => {
      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw `${response.status} - ${response.statusText}`;
      }

      if (!response.headers.get('content-type')?.includes('application/json')) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 'Content type is not supported';
      }

      return response.json();
    });
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

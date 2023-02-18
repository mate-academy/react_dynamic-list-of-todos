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
  try {
    // eslint-disable-next-line prefer-template
    const fullURL = BASE_URL + url + '.json';

    return wait(300)
      .then(() => fetch(fullURL))
      .then(res => res.json());
  } catch (error) {
    throw new Error(`Error while fetching ${error}`);
  }
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number | null) => get<User>(`/users/${userId}`);

import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promise
// that is resolved after a given delay
async function wait(delay: number): Promise<void> {
  try {
    return await new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  } catch (e) {
    throw e instanceof Error ? e : new Error(String(e));
  }
}

async function get<T>(url: string): Promise<T> {
  try {
    const fullURL = BASE_URL + url + '.json';

    // we add some delay to see how the loader works
    return await wait(300)
      .then(() => fetch(fullURL))
      .then(res => res.json());
  } catch (e) {
    throw e instanceof Error ? e : new Error(String(e));
  }
  // eslint-disable-next-line prefer-template
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

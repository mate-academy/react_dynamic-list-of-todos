import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see how the loader works
  return wait(500)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getAllTodos = () => {
  return get<Todo[]>('/todos').then(todos => todos);
};

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

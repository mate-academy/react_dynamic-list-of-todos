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
    .then(res => res.json());
}

export const getTodos = async (): Promise<Todo[]> => {
  const loadedTodos = await get<Todo[]>('/todos');

  return loadedTodos;
};

export const getUser = async (userId: number): Promise<User> => {
  const loadedUser = await get<User>(`/users/${userId}`);

  return loadedUser;
};

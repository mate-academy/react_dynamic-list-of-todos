import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function get<T>(endpoint: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + endpoint + '.json';

  return fetch(fullURL)
    .then(res => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

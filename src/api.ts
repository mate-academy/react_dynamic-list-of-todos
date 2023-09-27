import { Todo } from './types/Todo';
import { User } from './types/User';
// eslint-disable-next-line
require('dotenv').config({ path: '../.env' });

const BASE_URL = process.env.REACT_APP_BASE_URL;

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  return wait(1000)
    .then(() => fetch(fullURL))
    .then((res) => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

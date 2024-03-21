import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function getData<T>(url: string): Promise<T> {

  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getTodos = () => getData<Todo[]>('/todos');

export const getUser = (userId: number) => getData<User>(`/users/${userId}`);

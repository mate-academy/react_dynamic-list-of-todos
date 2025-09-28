import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function get<T>(url: string): Promise<T> {
  return wait(300)
    .then(() => fetch(`${BASE_URL}${url}.json`))
    .then(res => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');
export const getUser = (userId: number) => get<User>(`/users/${userId}`);

import { Todo } from '../types/Todo';
import { User } from '../types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then((response) => response.json());
}

export function getTodos() {
  return getData<Todo[]>('/todos.json')
    .then(todos => todos);
}

export function getUsers(userId: number) {
  return getData<User[]>(`/users/${userId}.json`)
    .then(users => users);
}

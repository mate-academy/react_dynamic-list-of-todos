import { User, Todo } from './types';

const BASE_URL = 'https://mate.academy/students-api';

function getData(url: string) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
}

export function getTodos(): Promise<Todo[]> {
  return getData('/todos');
}

export function getUserById(id: number): Promise<User> {
  return getData(`/users/${id}`);
}

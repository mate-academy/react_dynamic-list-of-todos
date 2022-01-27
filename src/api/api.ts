import { Todo, User } from '../types/types';

const url = 'https://mate.academy/students-api';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${url}/todos`)
    .then(response => response.json());
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${url}/users/${userId}`)
    .then(response => response.json());
}

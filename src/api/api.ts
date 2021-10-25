import { Todo, User } from '../types';

const MAIN_URL = 'https://mate.academy/students-api';

export function getTodo(): Promise<Todo[]> {
  return fetch(`${MAIN_URL}/todos`)
    .then(response => response.json());
}

export function getUser(endpoint: string): Promise<User> {
  return fetch(`${MAIN_URL}/users/${endpoint}`)
    .then(response => response.json());
}

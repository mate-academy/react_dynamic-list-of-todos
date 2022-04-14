import { Todo, User } from '../types';

const API_URL_TODOS = 'https://mate.academy/students-api/todos';

const API_URL_USERS = 'https://mate.academy/students-api/users/';

export function getAllTodos(): Promise<Todo[]> {
  return fetch(API_URL_TODOS)
    .then(response => response.json());
}

export function getAllUsers(): Promise<User[]> {
  return fetch(API_URL_USERS)
    .then(response => response.json());
}

export function getSelectedUser(userId:number): Promise<User> {
  return fetch(`${API_URL_USERS}${userId}`).then(response => response.json());
}

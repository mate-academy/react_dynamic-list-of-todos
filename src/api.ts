import { Todos, Users } from './interfaces';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = (): Promise<Todos[]> => {
  return fetch(`${TODOS_URL}`)
    .then(response => response.json());
};

export const getUsers = (): Promise<Users[]> => {
  return fetch(`${USERS_URL}`)
    .then(response => response.json());
};

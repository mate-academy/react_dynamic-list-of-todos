import { Todo, User } from './interfaces';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const USERS_URL = '/users';
const TODOS_URL = '/todos';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
}

export const getUsers = (): Promise<User[]> => {
  return getData<User[]>(USERS_URL);
};

export const getTodos = (): Promise<Todo[]> => {
  return getData<Todo[]>(TODOS_URL);
};

import { TodoProps, UserProps } from '../types';

const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';

function getData<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => response.json());
}

export const getUsers = () => getData<UserProps[]>(USERS_API);
export const getTodos = () => getData<TodoProps[]>(TODOS_API);

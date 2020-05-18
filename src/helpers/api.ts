const API_URL = 'https://jsonplaceholder.typicode.com/';

export interface User {
  id: number;
  name: string;
}

export interface Todo {
  map(arg0: (todo: Todo) => JSX.Element): import('react').ReactNode;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getUsers = () => getAll<User>('users');

export const getTodos = () => getAll<Todo>('todos');

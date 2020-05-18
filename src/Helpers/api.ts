const API_URL = 'https://jsonplaceholder.typicode.com';

const getAll = async <T>(URL: string): Promise<T[]> => {
  return fetch(API_URL + URL)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => getAll('/users');
export const getTodos = (): Promise<Todo[]> => getAll('/todos');

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}

export interface User {
  id: number;
  name: string;
}

export default Todo;

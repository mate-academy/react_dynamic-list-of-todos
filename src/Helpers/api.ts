const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

const getAll = async <T>(URL: string): Promise<T[]> => {
  return fetch(API_URL + URL)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => getAll('/users.json');
export const getTodos = (): Promise<Todo[]> => getAll('/todos.json');

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

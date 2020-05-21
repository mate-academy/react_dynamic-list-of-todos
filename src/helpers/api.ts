const API_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

const getInfo = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getUsers = () => getInfo<User>('/users');
export const getTodos = () => getInfo<Todo>('/todos');

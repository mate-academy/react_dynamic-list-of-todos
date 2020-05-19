const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

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

const getAllInfo = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => {
  return getAllInfo<User>('/users.json')
};

export const getTodos = (): Promise<Todo[]> => {
  return getAllInfo<Todo>('/todos.json')
};

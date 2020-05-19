const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';

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

export const getInfo = async <T>(url: string): Promise<T> => {
  const response = await fetch(BASE_URL + url);

  return response.json();
};

export const getUsers = async (): Promise <User[]> => {
  return getInfo('/users.json');
};

export const getTodos = async (): Promise <Todo[]> => {
  return getInfo('/todos.json');
};

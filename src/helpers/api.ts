
const getAll = <T>(url: string): Promise<T[]> => {
  const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';

  return fetch(`${API_URL}${url}.json`)
    .then(response => response.json());
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export const getUsers = () => (getAll<User>('users'));
export const getTodos = () => (getAll<Todo>('todos'));

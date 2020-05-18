const URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  'id': number;
  'name': string;
}

export interface Todo {
  'userId': number;
  'id': number;
  'title': string;
  'completed': boolean;
  'user'?: User;
}

const getData = <T>(url: string): Promise<T[]> => {
  return fetch(URL + url).then(response => response.json());
};

export const getTodos = () => getData<Todo>('/todos');
export const getUsers = () => getData<User>('/users');

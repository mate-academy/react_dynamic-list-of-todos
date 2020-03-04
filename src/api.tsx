import { TodoType, UserType } from './types';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getUsers = () => {
  return getData<UserType[]>(usersUrl);
};

export const getTodos = () => {
  return getData<TodoType[]>(todosUrl);
};

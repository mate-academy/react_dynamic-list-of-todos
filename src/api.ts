import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getTodos = async (): Promise<Todo[]> => {
  await wait(1000);
  const response = await fetch(`${BASE_URL}/todos.json`);

  return response.json();
};

export const getUser = async (userId: number): Promise<User> => {
  await wait(1000);
  const response = await fetch(`${BASE_URL}/users/${userId}.json`);

  return response.json();
};

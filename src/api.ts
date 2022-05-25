import { Todo } from './types/Todo';
import { User } from './types/User';

const MAIN_URL = 'https://mate.academy/students-api';

export const getData = async (url: string) => {
  const response = await fetch(`${MAIN_URL}${url}`);

  return response.json();
};

export const getTodos = async (): Promise<Todo[]> => {
  const resp = await fetch(`${MAIN_URL}/todos`);
  const todos = await resp.json();

  return todos;
};

export const getUser = async (id: number): Promise<User> => {
  const resp = await fetch(`${MAIN_URL}/users/${id}`);
  const user = await resp.json();

  return user;
};

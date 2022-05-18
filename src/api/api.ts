/* eslint-disable no-console */
import { ToDo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodosFromServer = async (): Promise<ToDo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const getUserFromServer = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  return response.json();
};

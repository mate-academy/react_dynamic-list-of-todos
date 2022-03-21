import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

const request = async (url: string) => {
  const responce = await fetch(`${BASE_URL}${url}`);

  return responce.json();
};

export const getAllTodos = (): Promise<Todo[]> => request('/todos');

export const getUserById = (userId: number): Promise<User> => request(`/users/${userId}`);

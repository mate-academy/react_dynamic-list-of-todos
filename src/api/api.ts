import { User } from '../types/User';
import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

const request = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  return response.json();
};

export const getTodos = (): Promise<Todo[]> => {
  return request('/todos');
};

export const getUser = async (id: number): Promise<User> => {
  return request(`/users/${id}`);
};

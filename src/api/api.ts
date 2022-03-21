import { User } from '../types/User';
import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

const request = async (endpoint: string) => {
  const url = await fetch(`${BASE_URL}${endpoint}`);

  return url.json();
};

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getTodos = (): Promise<Todo[]> => {
  return request('/todos');
};

export const getUser = async (id: number): Promise<User> => {
  await wait(1000);

  return request(`/users/${id}`);
};

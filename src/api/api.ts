import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

const wait = (delay: number): Promise<typeof delay> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(delay), delay);
  });
};

const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getTodos = () => request<Todo[]>('/todos');

export const getUserInfo = async (userId: User['id']) => {
  await wait(1000);

  return request<User>(`/users/${userId}`);
};

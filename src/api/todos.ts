import { User, Todo } from '../components/types';

const BASE_URL = 'https://mate.academy/students-api';

export const request = async (endpoint: string) => {
  try {
    const responce = await fetch(`${BASE_URL}${endpoint}`);

    return await responce.json();
  } catch (error) {
    return null;
  }
};

export const getTodos = (): Promise<Todo[]> => request('/todos');

export const getUser = (userId: number): Promise<User> => request(`/users/${userId}`);

import { User, Todo } from './type';

const BASE_URL = 'https://mate.academy/students-api';

export const getData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    return await response.json();
  } catch (error) {
    return null;
  }
};

export function getUserById(id: number): Promise<User> {
  return getData(`/users/${id}`);
}

export function getTodos(): Promise<Todo[]> {
  return getData('/todos');
}

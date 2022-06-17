import { Todo, User } from './react-app-env';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const request = await fetch(`${BASE_URL}/todos`);

  return request.json();
};

export const getUser = async (userId: number): Promise<User> => {
  const request = await fetch(`${BASE_URL}/users/${userId}`);

  return request.json();
};

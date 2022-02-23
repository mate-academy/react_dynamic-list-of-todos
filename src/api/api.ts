import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(url)
    .then(response => response.json());
};

export const getAllTodos = (): Promise<Todo[]> => {
  return request(`${BASE_URL}/todos`);
};

export const getUserById = (id: number): Promise<User> => {
  return request(`${BASE_URL}/users/${id}`);
};

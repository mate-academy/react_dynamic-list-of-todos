import { User } from '../types/User';
import { Todo } from '../types/Todo';

const URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(url)
    .then(response => response.json());
};

export const getTodos = (): Promise<Todo[]> => {
  return request(`${URL}/todos`);
};

export const getUser = (id: number): Promise<User> => {
  return request(`${URL}/users/${id}`);
};

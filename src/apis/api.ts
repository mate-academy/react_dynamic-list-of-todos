import { Todo, User } from '../react-app-env';

const BASE_URL = 'https://mate.academy/students-api';

export const getAllTodos = (): Promise<Todo[]> => (
  fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
);

export const getUser = async (id: number): Promise<User> => {
  const userFromServer = await fetch(`${BASE_URL}/users/${id.toString()}`)
    .then(response => response.json());

  return userFromServer;
};

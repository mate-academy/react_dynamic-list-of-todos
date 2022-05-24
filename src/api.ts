import { Todo } from './types/todo';
import { User } from './types/user';

const API_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch((`${API_URL}/todos`));
  const todos = await response.json();

  return todos;
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  const user = await response.json();

  return user;
};

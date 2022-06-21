import { Todo, User } from './react-app-env';

const url = 'https://mate.academy/students-api';

export const requestTodo = (): Promise<Todo[]> => {
  return fetch(`${url}/todos`)
    .then(response => response.json());
};

export const requestUser = (selectedUserId: number): Promise<User> => {
  return fetch(`${url}/users/${selectedUserId}`)
    .then(response => response.json());
};

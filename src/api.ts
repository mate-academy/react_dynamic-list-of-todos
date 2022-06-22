import { Todo, User } from './react-app-env';

export const URL = 'https://mate.academy/students-api';

export const getAllTodos = (): Promise<Todo[]> => {
  return fetch(`${URL}/todos`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    });
};

export const getUserID = (id: number): Promise<User> => {
  return fetch(`${URL}/users/${id}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    });
};

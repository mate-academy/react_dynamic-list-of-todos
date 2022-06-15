import { Todo, User } from './react-app-env';

const API_URL_TODOS = 'https://mate.academy/students-api/todos';
const API_URL_USERS = 'https://mate.academy/students-api/users';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(API_URL_TODOS)
    .then(response => response.json());
};

export const getUser = (userId: number): Promise<User> => {
  return fetch(`${API_URL_USERS}/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('some error');
      }

      return response.json();
    });
};

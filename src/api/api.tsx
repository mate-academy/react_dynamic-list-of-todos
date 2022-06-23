/* eslint-disable no-console */
const TODOS_URL = 'https://mate.academy/students-api/todos';
const USERS_URL = 'https://mate.academy/students-api/users';

export function requestTodos(): Promise<Todo[]> {
  return fetch(TODOS_URL)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    });
}

export const requestUser = (userId: number): Promise<User> => {
  return fetch(`${USERS_URL}/${userId}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    });
};

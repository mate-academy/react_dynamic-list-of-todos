/* eslint-disable no-console */
const API_TODOS = 'https://mate.academy/students-api/todos';
const API_USERS = 'https://mate.academy/students-api/users';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(API_TODOS)
    .then(response => response.json());
};

export const getUser = (userId: number): Promise<User> => {
  console.log('asdasdasd');

  return fetch(`${API_USERS}/${userId}`)
    .then(response => response.json());
};

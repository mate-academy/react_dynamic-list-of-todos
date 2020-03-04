const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getUsers = (): Promise<User[]> => {
  return fetch(USERS_URL)
    .then(response => response.json());
};

export const getTodos = (): Promise<Todo[]> => {
  return fetch(TODOS_URL)
    .then(response => response.json());
};

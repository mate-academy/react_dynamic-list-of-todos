const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

const getData = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => {
  return getData(USERS_API);
};

export const getTodos = (): Promise<Todo[]> => {
  return getData(TODOS_API);
};

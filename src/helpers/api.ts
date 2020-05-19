const URL_API = 'https://jsonplaceholder.typicode.com';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(`${URL_API}/todos`)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => {
  return fetch(`${URL_API}/users`)
    .then(response => response.json());
};

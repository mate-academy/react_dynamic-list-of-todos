const URL_API = 'https://jsonplaceholder.typicode.com';

export const getTodos = (): Promise<Todos[]> => {
  return fetch(`${URL_API}/todos`)
    .then(response => response.json());
};

export const getUsers = (): Promise<Users[]> => {
  return fetch(`${URL_API}/users`)
    .then(response => response.json());
};

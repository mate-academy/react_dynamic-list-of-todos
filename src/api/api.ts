// eslint-disable-next-line
const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos/`)
    .then(response => response.json());
};

export const getUsers = (url: number) => {
  return fetch(`${BASE_URL}/users/${url}`)
    .then(response => response.json());
};

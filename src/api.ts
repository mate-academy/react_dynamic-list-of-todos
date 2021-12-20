// eslint-disable-next-line
const BASE_URL = `https://mate.academy/students-api`;

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json());
};

export const getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json());
};

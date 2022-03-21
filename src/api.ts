const BASE_API_URL = 'https://mate.academy/students-api/';

export const getAllTodos = () => {
  return fetch(`${BASE_API_URL}todos`)
    .then(response => response.json());
};

export const getAllUsers = () => {
  return fetch(`${BASE_API_URL}users`)
    .then(response => response.json());
};

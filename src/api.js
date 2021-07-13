/* eslint-disable arrow-body-style */
const BASE_URL = 'https://mate-api.herokuapp.com';

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    .then(todos => todos.data);
};

export const getUsers = (userId) => {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json())
    .then(todos => todos.data);
};

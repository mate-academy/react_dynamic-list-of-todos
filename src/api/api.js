const baseURL = 'https://mate-api.herokuapp.com';

export const getTodos = () => fetch(`${baseURL}/todos`)
  .then(response => response.json());

export const getUsers = userId => fetch(`${baseURL}/users/${userId}`)
  .then(response => response.json());

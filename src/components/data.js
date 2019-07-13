const ApiUrl = 'https://jsonplaceholder.typicode.com';

export const getUsers = () => fetch(`${ApiUrl}/users`)
  .then(response => response.json());

export const getTodos = () => fetch(`${ApiUrl}/todos`)
  .then(response => response.json());
